/**
 * Core TypeScript types and interfaces for the Data Dashboard
 * @author Data Dashboard Team
 */

// API Response Types
export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
  timestamp: string;
}

// Chart Data Types
export interface ChartDataPoint {
  x: string | number;
  y: number;
  label?: string;
}

export interface ChartDataset {
  label: string;
  data: ChartDataPoint[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
}

export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'area';
  title: string;
  datasets: ChartDataset[];
  options?: any;
}

// Dashboard Metrics Types
export interface MetricCard {
  id: string;
  title: string;
  value: number | string;
  unit?: string;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon?: string;
  color?: string;
}

// API Data Types
export interface SalesData {
  id: string;
  date: string;
  amount: number;
  product: string;
  category: string;
  region: string;
}

export interface UserAnalytics {
  id: string;
  date: string;
  activeUsers: number;
  newUsers: number;
  pageViews: number;
  sessionDuration: number;
}

export interface PerformanceMetrics {
  id: string;
  timestamp: string;
  cpuUsage: number;
  memoryUsage: number;
  responseTime: number;
  errorRate: number;
}

// UI State Types
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

export interface FilterOptions {
  dateRange: {
    start: string;
    end: string;
  };
  category?: string;
  region?: string;
}

// Navigation Types
export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  children?: NavItem[];
}

// Theme Types
export interface ThemeColors {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
}

export interface Theme {
  colors: ThemeColors;
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

// Dashboard Configuration
export interface DashboardConfig {
  refreshInterval: number;
  autoRefresh: boolean;
  theme: 'light' | 'dark' | 'auto';
  layout: 'grid' | 'list';
}
