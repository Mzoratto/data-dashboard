/**
 * Theme configuration and utilities for the Data Dashboard
 * Provides consistent styling across the application
 * @author Data Dashboard Team
 */

import { Theme } from '../types';

export const lightTheme: Theme = {
  colors: {
    primary: '#6366f1',
    secondary: '#64748b',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    background: '#fafbfc',
    backgroundSecondary: '#f8fafc',
    surface: '#ffffff',
    border: '#e2e8f0',
    text: '#0f172a',
    textSecondary: '#64748b',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1280px',
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#94a3b8',
    success: '#22c55e',
    warning: '#fbbf24',
    error: '#f87171',
    background: '#0f172a',
    backgroundSecondary: '#1e293b',
    surface: '#1e293b',
    border: '#334155',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1280px',
  },
};

/**
 * Chart color palettes for consistent visualization
 */
export const chartColors = {
  primary: ['#6366f1', '#8b5cf6', '#a855f7', '#c084fc', '#e9d5ff'],
  success: ['#10b981', '#22c55e', '#4ade80', '#86efac', '#d1fae5'],
  warning: ['#f59e0b', '#fbbf24', '#fcd34d', '#fde68a', '#fef3c7'],
  error: ['#ef4444', '#f87171', '#fca5a5', '#fecaca', '#fee2e2'],
  mixed: ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'],
};

/**
 * Modern gradient definitions
 */
export const gradients = {
  primary: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  success: 'linear-gradient(135deg, #10b981 0%, #22c55e 100%)',
  warning: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
  error: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
  surface: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
  background: 'linear-gradient(135deg, #fafbfc 0%, #f1f5f9 100%)',
};

/**
 * Utility function to get responsive font sizes
 */
export const getFontSize = (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl') => {
  const sizes = {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xxl: '1.5rem',
  };
  return sizes[size];
};

/**
 * Utility function to get box shadow styles
 */
export const getBoxShadow = (level: 'sm' | 'md' | 'lg') => {
  const shadows = {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  };
  return shadows[level];
};

/**
 * Utility function to get border radius
 */
export const getBorderRadius = (size: 'sm' | 'md' | 'lg' | 'xl') => {
  const radii = {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  };
  return radii[size];
};

/**
 * Utility function to get modern transitions
 */
export const getTransition = (property: string = 'all', duration: string = '0.2s') => {
  return `${property} ${duration} cubic-bezier(0.4, 0, 0.2, 1)`;
};

/**
 * Utility function to get modern animations
 */
export const animations = {
  fadeIn: 'fadeIn 0.3s ease-out',
  slideUp: 'slideUp 0.3s ease-out',
  scaleIn: 'scaleIn 0.2s ease-out',
  pulse: 'pulse 2s infinite',
};

/**
 * Utility function to get glass morphism effect
 */
export const getGlassMorphism = (opacity: number = 0.1) => ({
  background: `rgba(255, 255, 255, ${opacity})`,
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
});
