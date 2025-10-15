// performance utilities

// lazy load
// use only if target audince have a slow net speed, other wise keep it untouched.
export const lazyLoadModule = async (importFn, retries = 2) => {
  if (typeof importFn !== "function") {
    throw new Error("importFn must be a function");
  }

  for (let i = 0; i < retries; i++) {
    try {
      return await importFn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(() => resolve(), 500));
    }
  }
};

// preloadResourceWhenIdle function
export const preloadResourceWhenIdle = (href, resourceType) => {
  const runPreload = () => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = href;
    link.as = resourceType;
    document.head.appendChild(link);
  };

  if ("requestIdleCallback" in window) {
    requestIdleCallback(runPreload, { timeout: 2000 });
  } else {
    setTimeout(runPreload, 2000);
  }
};

export const preloadRoute = (importFn) => {
  importFn();
};
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
//ONLY MONOTRING TOOLS
const metrics = new Map();
let observers = [];
// Web Vitals monitoring (only in development)
export const monitorWebVitals = () => {
  if (import.meta.env.PROD || typeof window === "undefined") return;

  try {
    const observer = new PerformanceObserver((entryList) => {
      entryList.getEntries().forEach((entry) => {
        if (entry.entryType === "largest-contentful-paint") {
          metrics.set("LCP", entry.startTime);
          // Sanitize log output to prevent log injection
          const sanitizedTime =
            typeof entry.startTime === "number"
              ? entry.startTime.toFixed(2)
              : "unknown";
          console.log("LCP metric updated:", sanitizedTime);
        }
      });
    });
    observer.observe({ entryTypes: ["largest-contentful-paint"] });
    observers.push(observer);
  } catch (e) {
    console.log(e);
    
  }
};

// Get metrics
export const getMetrics = () => Object.fromEntries(metrics);

// Cleanup
export const cleanup = () => {
  observers.forEach((observer) => observer.disconnect());
  observers = [];
  metrics.clear();
};

// Memory monitoring (simplified)
export const getMemoryUsage = () => {
  if (performance.memory) {
    return {
      used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
      total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
    };
  }
  return null;
};
