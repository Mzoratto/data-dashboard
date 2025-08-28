/**
 * Real-time Data Hook
 * Simulates WebSocket connections for live data updates
 * @author Marco Zoratto
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { MetricCard } from '../types';
import { generateMetricCards } from '../services/mockDataGenerator';

interface UseRealTimeDataOptions {
  interval?: number; // Update interval in milliseconds
  enabled?: boolean; // Enable/disable real-time updates
  onDataUpdate?: (data: any) => void;
}

/**
 * Custom hook for real-time data simulation
 */
export const useRealTimeData = (options: UseRealTimeDataOptions = {}) => {
  const {
    interval = 30000, // 30 seconds default
    enabled = false,
    onDataUpdate
  } = options;

  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');

  // Simulate WebSocket connection
  const connect = useCallback(() => {
    setConnectionStatus('connecting');
    
    // Simulate connection delay
    setTimeout(() => {
      setIsConnected(true);
      setConnectionStatus('connected');
      setLastUpdate(new Date());
    }, 1000 + Math.random() * 2000);
  }, []);

  const disconnect = useCallback(() => {
    setIsConnected(false);
    setConnectionStatus('disconnected');
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Generate updated data
  const generateUpdate = useCallback(() => {
    if (!isConnected) return;

    const updatedMetrics = generateMetricCards();
    setLastUpdate(new Date());
    onDataUpdate?.(updatedMetrics);
  }, [isConnected, onDataUpdate]);

  // Start/stop real-time updates
  useEffect(() => {
    if (enabled && isConnected) {
      intervalRef.current = setInterval(generateUpdate, interval);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled, isConnected, interval, generateUpdate]);

  // Auto-connect when enabled
  useEffect(() => {
    if (enabled && connectionStatus === 'disconnected') {
      connect();
    } else if (!enabled && isConnected) {
      disconnect();
    }
  }, [enabled, isConnected, connectionStatus, connect, disconnect]);

  return {
    isConnected,
    connectionStatus,
    lastUpdate,
    connect,
    disconnect,
    forceUpdate: generateUpdate
  };
};

/**
 * Real-time metrics hook
 */
export const useRealTimeMetrics = (enabled: boolean = false) => {
  const [metrics, setMetrics] = useState<MetricCard[]>([]);
  const [updateCount, setUpdateCount] = useState(0);

  const handleDataUpdate = useCallback((newMetrics: MetricCard[]) => {
    setMetrics(newMetrics);
    setUpdateCount(prev => prev + 1);
  }, []);

  const realTimeData = useRealTimeData({
    interval: 15000, // 15 seconds for metrics
    enabled,
    onDataUpdate: handleDataUpdate
  });

  return {
    metrics,
    updateCount,
    ...realTimeData
  };
};
