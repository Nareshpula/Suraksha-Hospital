import { useState, useEffect } from 'react';
import { optimizeImageUrl } from '../utils/imageOptimizer';

const preloadedImages = new Set<string>();

interface ImagePreloaderOptions {
  priority?: 'high' | 'low';
  sizes?: string;
}

export const useImagePreloader = (src: string, options: ImagePreloaderOptions = {}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const optimizedSrc = optimizeImageUrl(src, {
    priority: options.priority,
    format: 'avif'
  });

  useEffect(() => {
    if (!optimizedSrc || preloadedImages.has(optimizedSrc)) return;

    const img = new Image();
    
    img.onload = () => {
      setIsLoaded(true);
      preloadedImages.add(optimizedSrc);
    };
    img.onerror = (e) => setError(e as Error);
    
    img.src = optimizedSrc;
    if (options.sizes) {
      img.sizes = options.sizes;
    }

    if (options.priority === 'high') {
      img.fetchPriority = 'high';
      img.loading = 'eager';
    } else {
      img.loading = 'lazy';
    }

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [optimizedSrc, options.priority, options.sizes]);

  return { isLoaded, error };
};