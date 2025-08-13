/**
 * API Service Layer
 * Centralized API communication with error handling and response formatting
 * @author Data Dashboard Team
 */

import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import {
  ApiResponse,
  MetricCard,
  SalesData,
  UserAnalytics,
  PerformanceMetrics,
  AppError
} from '../types';

// Request timing tracking
const requestTimings = new Map<string, Date>();

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://jsonplaceholder.typicode.com';
const API_TIMEOUT = 10000; // 10 seconds

/**
 * Axios instance with default configuration
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor for adding authentication tokens
 */
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Track request start time for debugging
    const requestId = `${config.method}-${config.url}-${Date.now()}`;
    requestTimings.set(requestId, new Date());

    // Store request ID for response interceptor
    config.headers['X-Request-ID'] = requestId;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for handling common response patterns
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response time in development
    if (process.env.NODE_ENV === 'development') {
      const endTime = new Date();
      const requestId = response.config.headers['X-Request-ID'] as string;
      const startTime = requestTimings.get(requestId);

      if (startTime) {
        const duration = endTime.getTime() - startTime.getTime();
        console.log(`API Request to ${response.config.url} took ${duration}ms`);
        // Clean up timing data
        requestTimings.delete(requestId);
      }
    }

    return response;
  },
  (error: AxiosError) => {
    // Clean up timing data on error
    if (error.config?.headers['X-Request-ID']) {
      requestTimings.delete(error.config.headers['X-Request-ID'] as string);
    }

    // Handle common error scenarios
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

/**
 * Generic error handler for API responses
 */
const handleApiError = (error: unknown, context: string): AppError => {
  console.error(`API Error in ${context}:`, error);
  
  if (axios.isAxiosError(error)) {
    return {
      code: `API_ERROR_${error.response?.status || 'UNKNOWN'}`,
      message: error.response?.data?.message || error.message || 'Network error occurred',
      details: {
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        context,
      },
      timestamp: new Date().toISOString(),
    };
  }
  
  return {
    code: 'UNKNOWN_ERROR',
    message: error instanceof Error ? error.message : 'An unexpected error occurred',
    details: { context, error },
    timestamp: new Date().toISOString(),
  };
};

/**
 * Generic API response wrapper
 */
const createApiResponse = <T>(data: T, message?: string): ApiResponse<T> => ({
  data,
  status: 'success',
  message,
  timestamp: new Date().toISOString(),
});

/**
 * Dashboard Metrics API
 */
export const metricsApi = {
  /**
   * Fetch dashboard metrics
   */
  async getMetrics(): Promise<ApiResponse<MetricCard[]>> {
    try {
      // For demo purposes, we'll use mock data
      // In a real application, this would be: const response = await apiClient.get('/metrics');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockMetrics: MetricCard[] = [
        {
          id: '1',
          title: 'Total Revenue',
          value: '$124,563',
          unit: 'USD',
          change: 12.5,
          changeType: 'increase',
          icon: '💰',
          color: '#10b981',
        },
        {
          id: '2',
          title: 'Active Users',
          value: '8,549',
          change: 8.2,
          changeType: 'increase',
          icon: '👥',
          color: '#2563eb',
        },
        {
          id: '3',
          title: 'Conversion Rate',
          value: '3.24%',
          change: -0.5,
          changeType: 'decrease',
          icon: '📈',
          color: '#f59e0b',
        },
        {
          id: '4',
          title: 'Avg. Session',
          value: '4m 32s',
          change: 2.1,
          changeType: 'increase',
          icon: '⏱️',
          color: '#8b5cf6',
        },
      ];
      
      return createApiResponse(mockMetrics, 'Metrics fetched successfully');
    } catch (error) {
      throw handleApiError(error, 'getMetrics');
    }
  },
};

/**
 * Sales Data API
 */
export const salesApi = {
  /**
   * Fetch sales data with optional filters
   */
  async getSalesData(filters?: { startDate?: string; endDate?: string; category?: string }): Promise<ApiResponse<SalesData[]>> {
    try {
      // Simulate API call with JSONPlaceholder
      const response = await apiClient.get('/posts');
      
      // Transform the data to match our SalesData interface
      const mockSalesData: SalesData[] = response.data.slice(0, 10).map((post: any, index: number) => ({
        id: post.id.toString(),
        date: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        amount: Math.floor(Math.random() * 10000) + 1000,
        product: `Product ${post.id}`,
        category: ['Electronics', 'Clothing', 'Books', 'Home'][index % 4],
        region: ['North', 'South', 'East', 'West'][index % 4],
      }));
      
      return createApiResponse(mockSalesData, 'Sales data fetched successfully');
    } catch (error) {
      throw handleApiError(error, 'getSalesData');
    }
  },
};

/**
 * User Analytics API
 */
export const analyticsApi = {
  /**
   * Fetch user analytics data
   */
  async getUserAnalytics(): Promise<ApiResponse<UserAnalytics[]>> {
    try {
      // Simulate API call
      const response = await apiClient.get('/users');
      
      // Transform the data to match our UserAnalytics interface
      const mockAnalytics: UserAnalytics[] = response.data.slice(0, 7).map((user: any, index: number) => ({
        id: user.id.toString(),
        date: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        activeUsers: Math.floor(Math.random() * 1000) + 500,
        newUsers: Math.floor(Math.random() * 100) + 50,
        pageViews: Math.floor(Math.random() * 5000) + 1000,
        sessionDuration: Math.floor(Math.random() * 300) + 120, // seconds
      }));
      
      return createApiResponse(mockAnalytics, 'User analytics fetched successfully');
    } catch (error) {
      throw handleApiError(error, 'getUserAnalytics');
    }
  },
};

/**
 * Performance Metrics API
 */
export const performanceApi = {
  /**
   * Fetch performance metrics
   */
  async getPerformanceMetrics(): Promise<ApiResponse<PerformanceMetrics[]>> {
    try {
      // Simulate real-time performance data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockPerformanceData: PerformanceMetrics[] = Array.from({ length: 24 }, (_, index) => ({
        id: (index + 1).toString(),
        timestamp: new Date(Date.now() - (23 - index) * 60 * 60 * 1000).toISOString(),
        cpuUsage: Math.floor(Math.random() * 80) + 10,
        memoryUsage: Math.floor(Math.random() * 70) + 20,
        responseTime: Math.floor(Math.random() * 200) + 50,
        errorRate: Math.random() * 5,
      }));
      
      return createApiResponse(mockPerformanceData, 'Performance metrics fetched successfully');
    } catch (error) {
      throw handleApiError(error, 'getPerformanceMetrics');
    }
  },
};

/**
 * Health Check API
 */
export const healthApi = {
  /**
   * Check API health status
   */
  async checkHealth(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
    try {
      // Simple health check using JSONPlaceholder
      await apiClient.get('/posts/1');
      
      return createApiResponse({
        status: 'healthy',
        timestamp: new Date().toISOString(),
      }, 'API is healthy');
    } catch (error) {
      throw handleApiError(error, 'checkHealth');
    }
  },
};

// Export the configured axios instance for custom requests
export { apiClient };

// Export all APIs as a single object
export const api = {
  metrics: metricsApi,
  sales: salesApi,
  analytics: analyticsApi,
  performance: performanceApi,
  health: healthApi,
};
