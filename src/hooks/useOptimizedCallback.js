import { useCallback, useRef } from "react";

export function useOptimizedCallback(callback, delay, type = "throttle") {
  const lastRun = useRef(Date.now());
  const timeoutRef = useRef(null);

  return useCallback(
    (...args) => {
      const now = Date.now();

      if (type === "throttle") {
        if (now - lastRun.current >= delay) {
          if (typeof callback === "function") {
            try {
              callback(...args);
            } catch (error) {
              console.error("Callback execution error:", error.message);
            }
          }
          lastRun.current = now;
        }
      } else if (type === "debounce") {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          if (typeof callback === "function") {
            try {
              callback(...args);
            } catch (error) {
              console.error("Callback execution error:", error.message);
            }
          }
          timeoutRef.current = null;
        }, delay);
      }
    },
    [callback, delay, type]
  );
}
