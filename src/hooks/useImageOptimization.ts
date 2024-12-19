import { useState, useEffect } from 'react';
import { preloadImage } from '../utils/imageLoader';

export const useImageOptimization = (src: string, options = { priority: 'low' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadImage = async () => {
      try {
        await preloadImage(src);
        if (mounted) {
          setIsLoaded(true);
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error);
        }
      }
    };

    loadImage();

    return () => {
      mounted = false;
    };
  }, [src]);

  return { isLoaded, error };
};