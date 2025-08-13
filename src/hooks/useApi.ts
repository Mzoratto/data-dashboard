/**
 * Custom API Hook
 * Provides reusable data fetching logic with error handling and loading states
 * @author Data Dashboard Team
 */

import { useState, useEffect, useCallback } from 'react';
import { ApiResponse } from '../types';

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: () => Promise<void>;
  reset: () => void;
}

/**
 * Custom hook for API calls with built-in loading and error states
 * @param apiFunction - Function that returns a Promise with API response
 * @param options - Configuration options for the hook
 */
export const useApi = <T>(
  apiFunction: () => Promise<ApiResponse<T>>,
  options: UseApiOptions = {}
): UseApiReturn<T> => {
  const { immediate = false, onSuccess, onError } = options;
  
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiFunction();
      
      if (response.status === 'success') {
        setData(response.data);
        onSuccess?.(response.data);
      } else {
        const errorMessage = response.message || 'API request failed';
        const apiError = new Error(errorMessage);
        setError(apiError);
        onError?.(apiError);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error);
      onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [apiFunction, onSuccess, onError]);

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
};

/**
 * Custom hook for periodic data fetching
 * @param apiFunction - Function that returns a Promise with API response
 * @param interval - Refresh interval in milliseconds
 * @param options - Configuration options
 */
export const usePolling = <T>(
  apiFunction: () => Promise<ApiResponse<T>>,
  interval: number,
  options: UseApiOptions & { enabled?: boolean } = {}
): UseApiReturn<T> => {
  const { enabled = true, ...apiOptions } = options;
  const apiHook = useApi(apiFunction, { ...apiOptions, immediate: enabled });

  useEffect(() => {
    if (!enabled || interval <= 0) return;

    const intervalId = setInterval(() => {
      apiHook.execute();
    }, interval);

    return () => clearInterval(intervalId);
  }, [apiHook.execute, interval, enabled]);

  return apiHook;
};

/**
 * Custom hook for debounced API calls
 * Useful for search inputs or frequent updates
 * @param apiFunction - Function that returns a Promise with API response
 * @param delay - Debounce delay in milliseconds
 * @param dependencies - Dependencies that trigger the API call
 */
export const useDebouncedApi = <T>(
  apiFunction: () => Promise<ApiResponse<T>>,
  delay: number,
  dependencies: any[]
): UseApiReturn<T> => {
  const apiHook = useApi(apiFunction);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      apiHook.execute();
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [...dependencies, delay]); // eslint-disable-line react-hooks/exhaustive-deps

  return apiHook;
};
