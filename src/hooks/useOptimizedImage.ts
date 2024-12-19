import { useState, useEffect } from 'react';

interface UseOptimizedImageOptions {
  quality?: number;
  width?: number;
  priority?: 'high' | 'low';
}

export const useOptimizedImage = (src: string, options: UseOptimizedImageOptions = {}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [optimizedSrc, setOptimizedSrc] = useState('');

  useEffect(() => {
    if (!src) return;

    const quality = options.quality || (options.priority === 'high' ? 85 : 75);
    const width = options.width || (options.priority === 'high' ? 1920 : 800);
    
    // Construct optimized URL with CDN parameters
    const optimizedUrl = `${src}?auto=format&fit=crop&q=${quality}&w=${width}`;
    setOptimizedSrc(optimizedUrl);

    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.onerror = (e) => setError(e as Error);
    img.src = optimizedUrl;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, options.quality, options.width, options.priority]);

  return { isLoaded, error, optimizedSrc };
};