import { useState, useEffect } from 'react';
import { optimizeImageUrl } from '../utils/imageOptimizer';

const imageCache = new Map<string, HTMLImageElement>();
const preloadQueue = new Map<string, Promise<void>>();

interface ImagePreloaderOptions {
  priority?: 'high' | 'low';
  sizes?: string;
  quality?: 'high' | 'medium' | 'low';
}

export const useImagePreloader = (src: string, options: ImagePreloaderOptions = {}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const quality = options.quality === 'high' ? 85 : options.quality === 'medium' ? 75 : 60;

  const optimizedSrc = optimizeImageUrl(src, {
    priority: options.priority,
    format: 'auto',
    quality
  });

  useEffect(() => {
    if (!optimizedSrc || imageCache.has(optimizedSrc.src)) {
      setIsLoaded(true);
      return;
    }

    // Check if image is already being loaded
    if (preloadQueue.has(optimizedSrc.src)) {
      preloadQueue.get(optimizedSrc.src)!.then(() => setIsLoaded(true));
      return;
    }

    const img = new Image();
    const loadPromise = new Promise<void>((resolve, reject) => {
      img.onload = () => {
        imageCache.set(optimizedSrc.src, img);
        setIsLoaded(true);
        resolve();
      };
      img.onerror = (e) => {
        setError(e as Error);
        reject(e);
      };
    });
    
    preloadQueue.set(optimizedSrc.src, loadPromise);
    
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
      preloadQueue.delete(optimizedSrc.src);
    };
  }, [optimizedSrc, options.priority, options.sizes]);

  return { isLoaded, error };
};