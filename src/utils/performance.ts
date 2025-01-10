// Cache for memoized values
const memoCache = new Map<string, any>();
const memoCacheTimers = new Map<string, NodeJS.Timeout>();
const DEBUG = import.meta.env.VITE_DEV_MODE === 'true';

// Memoization helper
export const memoize = async <T>(
  key: string,
  callback: () => Promise<T> | T,
  ttl = 5000
): Promise<T> => {
  if (memoCache.has(key)) {
    return memoCache.get(key);
  }

  // Clear any existing timer
  if (memoCacheTimers.has(key)) {
    clearTimeout(memoCacheTimers.get(key));
  }

  const result = await callback();
  memoCache.set(key, result);

  // Clear cache after TTL
  const timer = setTimeout(() => {
    memoCache.delete(key);
    memoCacheTimers.delete(key);
  }, ttl);
  
  memoCacheTimers.set(key, timer);

  return result;
};

// Performance monitoring
export const measurePerformance = (metricName: string) => {
  const start = performance.now();
  
  return {
    end: () => {
      const duration = performance.now() - start;
      if (DEBUG) {
        console.debug(`[Performance] ${metricName}: ${duration.toFixed(2)}ms`);
      }
      return duration;
    }
  };
};

// Resource timing analysis
export const analyzeResourceTiming = () => {
  if (!DEBUG) return;

  const resources = performance.getEntriesByType('resource');
  const imageResources = resources.filter(r => r.initiatorType === 'img');
  
  const metrics = {
    totalImages: imageResources.length,
    averageLoadTime: imageResources.reduce((acc, r) => acc + r.duration, 0) / imageResources.length,
    slowestImages: imageResources
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 5)
      .map(r => ({
        url: r.name,
        duration: r.duration
      }))
  };

  console.debug('[Resource Timing Analysis]', metrics);
};
// Debounce helper
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// RAF helper for smooth animations
export const rafThrottle = <T extends (...args: any[]) => any>(
  func: T
): ((...args: Parameters<T>) => void) => {
  let rafId: number | null = null;

  return (...args: Parameters<T>) => {
    if (rafId) return;

    rafId = requestAnimationFrame(() => {
      func(...args);
      rafId = null;
    });
  };
};