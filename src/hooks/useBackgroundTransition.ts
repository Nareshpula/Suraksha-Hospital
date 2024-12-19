import { useState, useEffect } from 'react';
import { preloadImages } from '../utils/imageLoader';

export const TRANSITION_INTERVAL = 30 * 60 * 1000; // 30 minutes in milliseconds

export const useBackgroundTransition = (images: Array<{ url: string; alt: string }>) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      try {
        setIsLoading(true);
        const validImages = images.filter(img => img?.url);
        await preloadImages(validImages.map(img => img.url), { priority: 'high' });
      } catch (error) {
        console.warn('Error preloading background images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, [images]);

  // Handle background transition
  useEffect(() => {
    if (isLoading || !images.length) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, TRANSITION_INTERVAL);

    return () => clearInterval(timer);
  }, [images.length, isLoading]);

  return { currentIndex, isLoading };
};