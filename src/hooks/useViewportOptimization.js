import { useState, useEffect, useMemo } from 'react';
import { useOptimizedCallback } from './useOptimizedCallback';

export function useViewportOptimization() {
  const [viewportSize, setViewportSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const updateViewport = useOptimizedCallback(() => {
    // Check if window is available to prevent SSR errors
    if (typeof window !== 'undefined') {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  }, 100, 'throttle');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateViewport);
      return () => window.removeEventListener('resize', updateViewport);
    }
  }, [updateViewport]);

  // Use useMemo instead of useCallback for better performance
  const isInViewport = useMemo(() => {
    return (element) => {
      if (!element) return false;
      const rect = element.getBoundingClientRect();
      return rect.top < viewportSize.height && rect.bottom > 0;
    };
  }, [viewportSize]);

  return { viewportSize, isInViewport };
}