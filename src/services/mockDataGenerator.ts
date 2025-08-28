/**
 * Enhanced Mock Data Generator
 * Generates realistic, time-based data for dashboard demo
 * @author Marco Zoratto
 */

import { MetricCard } from '../types';

/**
 * Real-time data streaming configuration
 */
export interface DataStreamConfig {
  interval: number; // milliseconds
  volatility: number; // 0-1, how much data can change
  trend: 'up' | 'down' | 'stable'; // overall trend
}

/**
 * Generate trending keywords data
 */
export const generateTrendingKeywords = () => {
  const keywords = [
    'React Dashboard', 'Data Visualization', 'TypeScript', 'Chart.js',
    'Analytics', 'Real-time Data', 'Modern UI', 'Portfolio Project',
    'Web Development', 'JavaScript', 'API Integration', 'Responsive Design'
  ];
  
  return keywords.map(keyword => ({
    term: keyword,
    count: Math.floor(Math.random() * 1000) + 100,
    change: (Math.random() - 0.5) * 20, // -10% to +10%
    category: Math.random() > 0.5 ? 'trending' : 'stable'
  }));
};

/**
 * Generate performance metrics with realistic patterns
 */
export const generatePerformanceMetrics = () => {
  return {
    loadTime: 1.2 + Math.random() * 0.8, // 1.2-2.0 seconds
    bounceRate: 25 + Math.random() * 15, // 25-40%
    conversionRate: 2.5 + Math.random() * 2, // 2.5-4.5%
    pageViews: Math.floor(Math.random() * 10000) + 5000,
    uniqueVisitors: Math.floor(Math.random() * 5000) + 2000,
    avgSessionDuration: 180 + Math.random() * 120, // 3-5 minutes
  };
};

/**
 * Generate realistic revenue data with seasonal patterns
 */
export const generateRevenueData = (months: number = 12) => {
  const currentDate = new Date();
  const data = [];
  
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const baseRevenue = 50000;
    const seasonalMultiplier = 1 + Math.sin((date.getMonth() / 12) * 2 * Math.PI) * 0.3;
    const randomVariation = 0.8 + Math.random() * 0.4;
    const growthTrend = 1 + (months - i - 1) * 0.05; // 5% monthly growth
    
    data.push({
      x: date.toLocaleDateString('en-US', { month: 'short' }),
      y: Math.round(baseRevenue * seasonalMultiplier * randomVariation * growthTrend),
      label: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    });
  }
  
  return data;
};

/**
 * Generate user analytics with weekly patterns
 */
export const generateUserAnalytics = (days: number = 30) => {
  const data = [];
  const currentDate = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - i);
    
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseUsers = isWeekend ? 800 : 1500;
    const randomVariation = 0.7 + Math.random() * 0.6;
    
    data.push({
      x: date.toLocaleDateString('en-US', { weekday: 'short' }),
      y: Math.round(baseUsers * randomVariation),
      label: date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric' 
      })
    });
  }
  
  return data.slice(-7); // Last 7 days
};

/**
 * Generate sales data by category with realistic distribution
 */
export const generateCategoryData = () => {
  const categories = [
    { name: 'Electronics', weight: 0.35, color: '#3b82f6' },
    { name: 'Clothing', weight: 0.25, color: '#10b981' },
    { name: 'Home & Garden', weight: 0.20, color: '#f59e0b' },
    { name: 'Books', weight: 0.12, color: '#8b5cf6' },
    { name: 'Sports', weight: 0.08, color: '#ef4444' }
  ];
  
  return categories.map(category => ({
    x: category.name,
    y: Math.round(category.weight * 100 + (Math.random() - 0.5) * 10),
    label: category.name,
    backgroundColor: category.color
  }));
};

/**
 * Generate performance metrics with realistic server patterns
 */
export const generatePerformanceData = (hours: number = 24) => {
  const data = [];
  const currentTime = new Date();
  
  for (let i = hours - 1; i >= 0; i--) {
    const time = new Date(currentTime.getTime() - i * 60 * 60 * 1000);
    const hour = time.getHours();
    
    // Simulate server load patterns (higher during business hours)
    const businessHourMultiplier = hour >= 9 && hour <= 17 ? 1.5 : 0.7;
    const baseResponseTime = 50;
    const randomVariation = 0.5 + Math.random() * 1.0;
    
    data.push({
      x: time.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
      }),
      y: Math.round(baseResponseTime * businessHourMultiplier * randomVariation),
      label: time.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        day: 'numeric',
        month: 'short'
      })
    });
  }
  
  return data;
};

/**
 * Generate realistic metric cards with proper change indicators
 */
export const generateMetricCards = (): MetricCard[] => {
  const revenueChange = (Math.random() - 0.3) * 20; // Bias towards positive
  const usersChange = (Math.random() - 0.2) * 15;
  const conversionChange = (Math.random() - 0.4) * 2;
  const sessionChange = (Math.random() - 0.3) * 30;
  
  return [
    {
      id: '1',
      title: 'Total Revenue',
      value: '$' + (124000 + Math.floor(Math.random() * 50000)).toLocaleString(),
      unit: 'USD',
      change: Number(revenueChange.toFixed(1)),
      changeType: revenueChange > 0 ? 'increase' : 'decrease',
      icon: '💰',
      color: '#10b981',
    },
    {
      id: '2',
      title: 'Active Users',
      value: (8500 + Math.floor(Math.random() * 2000)).toLocaleString(),
      change: Number(usersChange.toFixed(1)),
      changeType: usersChange > 0 ? 'increase' : 'decrease',
      icon: '👥',
      color: '#3b82f6',
    },
    {
      id: '3',
      title: 'Conversion Rate',
      value: (3.2 + conversionChange).toFixed(2) + '%',
      change: Number(conversionChange.toFixed(2)),
      changeType: conversionChange > 0 ? 'increase' : 'decrease',
      icon: '📈',
      color: '#f59e0b',
    },
    {
      id: '4',
      title: 'Avg. Session',
      value: Math.floor(4 + sessionChange / 10) + 'm ' + 
             Math.floor(30 + (sessionChange % 10) * 6) + 's',
      change: Number(sessionChange.toFixed(1)),
      changeType: sessionChange > 0 ? 'increase' : 'decrease',
      icon: '⏱️',
      color: '#8b5cf6',
    },
  ];
};

/**
 * Generate time-series data for advanced analytics
 */
export const generateTimeSeriesData = (
  dataPoints: number = 50, 
  trend: 'up' | 'down' | 'stable' = 'up'
) => {
  const data = [];
  let baseValue = 1000;
  
  for (let i = 0; i < dataPoints; i++) {
    const trendMultiplier = trend === 'up' ? 1.01 : trend === 'down' ? 0.99 : 1;
    const randomVariation = 0.9 + Math.random() * 0.2;
    
    baseValue *= trendMultiplier;
    
    data.push({
      x: new Date(Date.now() - (dataPoints - i) * 24 * 60 * 60 * 1000),
      y: Math.round(baseValue * randomVariation)
    });
  }
  
  return data;
};
