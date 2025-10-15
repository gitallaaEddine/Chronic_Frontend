import { useEffect, useRef, useState, memo } from "react";

/**
 * ScrollFadeIn component that animates children when they come into view
 * 
 * @param {React.ReactNode} children - Child elements to animate
 * @param {string} className - Additional CSS classes
 * @param {number} threshold - Intersection threshold (0-1)
 * @param {string} rootMargin - Root margin for intersection observer
 */
function ScrollFadeIn({ children, className = "", threshold = 0.1, rootMargin = "0px" }) {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element); // Animate once for performance
        }
      },
      { 
        threshold,
        rootMargin
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? "animate-fade-up-2" : ""}`}
    >
      {children}
    </div>
  );
}

// Set display name for better debugging
ScrollFadeIn.displayName = 'ScrollFadeIn';

export default memo(ScrollFadeIn);
