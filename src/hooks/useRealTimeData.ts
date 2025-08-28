/**
 * Real-time Data Hook
 * Provides live data updates for dashboard components
 * @author Marco Zoratto
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  generateRevenueData, 
  generateUserAnalytics, 
  generatePerformanceMetrics,
  generateTrendingKeywords,
  DataStreamConfig
} from '../services/mockDataGenerator';

export interface RealTimeDataState {
  revenue: any[];
  users: any[];
  performance: any;
  keywords: any[];
  lastUpdated: Date;
  isLive: boolean;
}

/**
 * Hook for managing real-time data streams
 */
export const useRealTimeData = (config: Partial<DataStreamConfig> = {}) => {
  const [data, setData] = useState<RealTimeDataState>({
    revenue: [],
    users: [],
    performance: {},
    keywords: [],
    lastUpdated: new Date(),
    isLive: false
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const configRef = useRef<DataStreamConfig>({
    interval: 5000, // 5 seconds default
    volatility: 0.3,
    trend: 'stable',
    ...config
  });

  /**
   * Generate fresh data with smooth transitions
   */
  const generateFreshData = useCallback(() => {
    const newRevenue = generateRevenueData(12);
    const newUsers = generateUserAnalytics(30);
    const newPerformance = generatePerformanceMetrics();
    const newKeywords = generateTrendingKeywords();

    setData(prev => ({
      revenue: newRevenue,
      users: newUsers,
      performance: newPerformance,
      keywords: newKeywords,
      lastUpdated: new Date(),
      isLive: prev.isLive
    }));
  }, []);

  /**
   * Start real-time data streaming
   */
  const startStream = useCallback(() => {
    if (intervalRef.current) return;

    setData(prev => ({ ...prev, isLive: true }));
    generateFreshData(); // Initial data

    intervalRef.current = setInterval(() => {
      generateFreshData();
    }, configRef.current.interval);
  }, [generateFreshData]);

  /**
   * Stop real-time data streaming
   */
  const stopStream = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setData(prev => ({ ...prev, isLive: false }));
  }, []);

  /**
   * Toggle streaming on/off
   */
  const toggleStream = useCallback(() => {
    if (data.isLive) {
      stopStream();
    } else {
      startStream();
    }
  }, [data.isLive, startStream, stopStream]);

  /**
   * Update streaming configuration
   */
  const updateConfig = useCallback((newConfig: Partial<DataStreamConfig>) => {
    configRef.current = { ...configRef.current, ...newConfig };
    
    // Restart stream with new config if currently active
    if (data.isLive) {
      stopStream();
      setTimeout(startStream, 100);
    }
  }, [data.isLive, startStream, stopStream]);

  /**
   * Manual refresh
   */
  const refresh = useCallback(() => {
    generateFreshData();
  }, [generateFreshData]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Initialize with data
  useEffect(() => {
    generateFreshData();
  }, [generateFreshData]);

  return {
    data,
    startStream,
    stopStream,
    toggleStream,
    updateConfig,
    refresh,
    config: configRef.current
  };
};

/**
 * Hook for live metrics with animations
 */
export const useLiveMetrics = (initialValue: number = 0, increment: number = 1) => {
  const [value, setValue] = useState(initialValue);
  const [isAnimating, setIsAnimating] = useState(false);

  const animate = useCallback((targetValue: number, duration: number = 1000) => {
    setIsAnimating(true);
    const startValue = value;
    const difference = targetValue - startValue;
    const steps = 60; // 60fps
    const stepValue = difference / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setValue(startValue + (stepValue * currentStep));

      if (currentStep >= steps) {
        clearInterval(timer);
        setValue(targetValue);
        setIsAnimating(false);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const increment_value = useCallback(() => {
    animate(value + increment);
  }, [value, increment, animate]);

  const decrement = useCallback(() => {
    animate(Math.max(0, value - increment));
  }, [value, increment, animate]);

  const reset = useCallback(() => {
    animate(initialValue);
  }, [initialValue, animate]);

  return {
    value,
    isAnimating,
    animate,
    increment: increment_value,
    decrement,
    reset
  };
};
