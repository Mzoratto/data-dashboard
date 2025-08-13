/**
 * Dashboard Context
 * Global state management for the dashboard application
 * Provides centralized state for data, loading states, and error handling
 * @author Data Dashboard Team
 */

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import {
  MetricCard,
  SalesData,
  UserAnalytics,
  PerformanceMetrics,
  LoadingState,
  FilterOptions,
  DashboardConfig,
  AppError
} from '../types';
import { api } from '../services/api';

// Dashboard State Interface
interface DashboardState {
  // Data
  metrics: MetricCard[];
  salesData: SalesData[];
  userAnalytics: UserAnalytics[];
  performanceMetrics: PerformanceMetrics[];
  
  // UI State
  loading: LoadingState;
  filters: FilterOptions;
  config: DashboardConfig;
  
  // Error State
  error: AppError | null;
}

// Action Types
type DashboardAction =
  | { type: 'SET_LOADING'; payload: { key: keyof DashboardState; isLoading: boolean } }
  | { type: 'SET_ERROR'; payload: AppError | null }
  | { type: 'SET_METRICS'; payload: MetricCard[] }
  | { type: 'SET_SALES_DATA'; payload: SalesData[] }
  | { type: 'SET_USER_ANALYTICS'; payload: UserAnalytics[] }
  | { type: 'SET_PERFORMANCE_METRICS'; payload: PerformanceMetrics[] }
  | { type: 'SET_FILTERS'; payload: FilterOptions }
  | { type: 'SET_CONFIG'; payload: Partial<DashboardConfig> }
  | { type: 'UPDATE_LAST_UPDATED'; payload: string };

// Context Interface
interface DashboardContextType {
  state: DashboardState;
  
  // Data fetching methods
  fetchMetrics: () => Promise<void>;
  fetchSalesData: () => Promise<void>;
  fetchUserAnalytics: () => Promise<void>;
  fetchPerformanceMetrics: () => Promise<void>;
  refreshAllData: () => Promise<void>;
  
  // State update methods
  updateFilters: (filters: Partial<FilterOptions>) => void;
  updateConfig: (config: Partial<DashboardConfig>) => void;
  clearError: () => void;
}

// Initial State
const initialState: DashboardState = {
  metrics: [],
  salesData: [],
  userAnalytics: [],
  performanceMetrics: [],
  
  loading: {
    isLoading: false,
    error: null,
    lastUpdated: null,
  },
  
  filters: {
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
      end: new Date().toISOString().split('T')[0], // today
    },
  },
  
  config: {
    refreshInterval: 300000, // 5 minutes
    autoRefresh: true,
    theme: 'light',
    layout: 'grid',
  },
  
  error: null,
};

// Reducer Function
const dashboardReducer = (state: DashboardState, action: DashboardAction): DashboardState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: {
          ...state.loading,
          isLoading: action.payload.isLoading,
        },
      };
      
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: {
          ...state.loading,
          isLoading: false,
          error: action.payload?.message || null,
        },
      };
      
    case 'SET_METRICS':
      return {
        ...state,
        metrics: action.payload,
        loading: {
          ...state.loading,
          isLoading: false,
          error: null,
          lastUpdated: new Date().toISOString(),
        },
      };
      
    case 'SET_SALES_DATA':
      return {
        ...state,
        salesData: action.payload,
      };
      
    case 'SET_USER_ANALYTICS':
      return {
        ...state,
        userAnalytics: action.payload,
      };
      
    case 'SET_PERFORMANCE_METRICS':
      return {
        ...state,
        performanceMetrics: action.payload,
      };
      
    case 'SET_FILTERS':
      return {
        ...state,
        filters: action.payload,
      };
      
    case 'SET_CONFIG':
      return {
        ...state,
        config: {
          ...state.config,
          ...action.payload,
        },
      };
      
    case 'UPDATE_LAST_UPDATED':
      return {
        ...state,
        loading: {
          ...state.loading,
          lastUpdated: action.payload,
        },
      };
      
    default:
      return state;
  }
};

// Create Context
const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Provider Props Interface
interface DashboardProviderProps {
  children: React.ReactNode;
}

/**
 * Dashboard Provider Component
 * Wraps the application with dashboard context and state management
 */
export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  // Helper function to handle errors
  const handleError = useCallback((error: unknown, context: string) => {
    console.error(`Dashboard Error in ${context}:`, error);
    
    const appError: AppError = {
      code: 'DASHBOARD_ERROR',
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
      details: { context, error },
      timestamp: new Date().toISOString(),
    };
    
    dispatch({ type: 'SET_ERROR', payload: appError });
  }, []);

  // API data fetching functions
  const fetchMetrics = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: { key: 'metrics', isLoading: true } });

      const response = await api.metrics.getMetrics();
      dispatch({ type: 'SET_METRICS', payload: response.data });
    } catch (error) {
      handleError(error, 'fetchMetrics');
    }
  }, [handleError]);

  const fetchSalesData = useCallback(async () => {
    try {
      const response = await api.sales.getSalesData(state.filters);
      dispatch({ type: 'SET_SALES_DATA', payload: response.data });
    } catch (error) {
      handleError(error, 'fetchSalesData');
    }
  }, [handleError, state.filters]);

  const fetchUserAnalytics = useCallback(async () => {
    try {
      const response = await api.analytics.getUserAnalytics();
      dispatch({ type: 'SET_USER_ANALYTICS', payload: response.data });
    } catch (error) {
      handleError(error, 'fetchUserAnalytics');
    }
  }, [handleError]);

  const fetchPerformanceMetrics = useCallback(async () => {
    try {
      const response = await api.performance.getPerformanceMetrics();
      dispatch({ type: 'SET_PERFORMANCE_METRICS', payload: response.data });
    } catch (error) {
      handleError(error, 'fetchPerformanceMetrics');
    }
  }, [handleError]);

  const refreshAllData = useCallback(async () => {
    await Promise.all([
      fetchMetrics(),
      fetchSalesData(),
      fetchUserAnalytics(),
      fetchPerformanceMetrics(),
    ]);
  }, [fetchMetrics, fetchSalesData, fetchUserAnalytics, fetchPerformanceMetrics]);

  const updateFilters = useCallback((filters: Partial<FilterOptions>) => {
    dispatch({ 
      type: 'SET_FILTERS', 
      payload: { ...state.filters, ...filters } 
    });
  }, [state.filters]);

  const updateConfig = useCallback((config: Partial<DashboardConfig>) => {
    dispatch({ type: 'SET_CONFIG', payload: config });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'SET_ERROR', payload: null });
  }, []);

  // Auto-refresh effect
  useEffect(() => {
    if (state.config.autoRefresh && state.config.refreshInterval > 0) {
      const interval = setInterval(() => {
        refreshAllData();
      }, state.config.refreshInterval);

      return () => clearInterval(interval);
    }
  }, [state.config.autoRefresh, state.config.refreshInterval, refreshAllData]);

  // Initial data fetch
  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  const contextValue: DashboardContextType = {
    state,
    fetchMetrics,
    fetchSalesData,
    fetchUserAnalytics,
    fetchPerformanceMetrics,
    refreshAllData,
    updateFilters,
    updateConfig,
    clearError,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};

/**
 * Custom hook to use Dashboard Context
 * Provides type-safe access to dashboard state and methods
 */
export const useDashboard = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  
  return context;
};
