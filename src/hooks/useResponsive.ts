/**
 * Custom Responsive Hook
 * Provides responsive design utilities and breakpoint detection
 * @author Data Dashboard Team
 */

import { useState, useEffect } from 'react';
import { lightTheme } from '../utils/theme';

interface BreakpointState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
}

/**
 * Custom hook for responsive design and breakpoint detection
 */
export const useResponsive = (): BreakpointState => {
  const [breakpointState, setBreakpointState] = useState<BreakpointState>(() => {
    // Initialize with current window dimensions
    const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const height = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    return {
      isMobile: width < parseInt(lightTheme.breakpoints.mobile),
      isTablet: width >= parseInt(lightTheme.breakpoints.mobile) && width < parseInt(lightTheme.breakpoints.desktop),
      isDesktop: width >= parseInt(lightTheme.breakpoints.desktop),
      width,
      height,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setBreakpointState({
        isMobile: width < parseInt(lightTheme.breakpoints.mobile),
        isTablet: width >= parseInt(lightTheme.breakpoints.mobile) && width < parseInt(lightTheme.breakpoints.desktop),
        isDesktop: width >= parseInt(lightTheme.breakpoints.desktop),
        width,
        height,
      });
    };

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpointState;
};

/**
 * Custom hook for media query matching
 * @param query - CSS media query string
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Set initial value
    setMatches(mediaQuery.matches);

    // Add listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [query]);

  return matches;
};

/**
 * Custom hook for detecting dark mode preference
 */
export const useDarkMode = (): boolean => {
  return useMediaQuery('(prefers-color-scheme: dark)');
};

/**
 * Custom hook for detecting reduced motion preference
 */
export const useReducedMotion = (): boolean => {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
};
