import { useState, useEffect } from 'react';
import { optimizeImageUrl } from '../utils/imageOptimizer';

interface ImagePreloaderOptions {
  priority?: 'high' | 'low';
}

export const useImagePreloader = (src: string, options: ImagePreloaderOptions = {}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    
    img.onload = () => setIsLoaded(true);
    img.onerror = (e) => setError(e as Error);
    
    const optimizedSrc = optimizeImageUrl(src, {
      priority: options.priority
    });

    img.src = optimizedSrc;

    if (options.priority === 'high') {
      img.fetchPriority = 'high';
    }

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, options.priority]);

  return { isLoaded, error };
};