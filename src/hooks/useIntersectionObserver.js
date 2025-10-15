import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for observing element intersection with viewport
 * 
 * @param {Object} options - IntersectionObserver options
 * @param {number|number[]} options.threshold - Threshold(s) at which to trigger callback (default: 0.1)
 * @param {string} options.rootMargin - Margin around the root (default: '50px')
 * @param {Element} options.root - Root element for intersection (default: viewport)
 * 
 * @returns {Object} Object containing:
 *   - ref: React ref to attach to the element to observe
 *   - isIntersecting: Boolean indicating if element is currently intersecting
 *   - hasIntersected: Boolean indicating if element has ever intersected (useful for one-time animations)
 * 
 * @example
 * const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.5 });
 * 
 * return (
 *   <div ref={ref}>
 *     {hasIntersected && <AnimatedComponent />}
 *   </div>
 * );
 */
export function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasIntersected, options]);

  return { ref, isIntersecting, hasIntersected };
}