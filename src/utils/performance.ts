// Cache for memoized values
const memoCache = new Map<string, any>();

// Memoization helper
export const memoize = <T>(key: string, callback: () => T, ttl = 5000): T => {
  if (memoCache.has(key)) {
    return memoCache.get(key);
  }

  const result = callback();
  memoCache.set(key, result);

  // Clear cache after TTL
  setTimeout(() => memoCache.delete(key), ttl);

  return result;
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