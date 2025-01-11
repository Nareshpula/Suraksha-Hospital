import React from 'react';
import { useOptimizedImage } from '../../hooks/useOptimizedImage';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  priority?: 'high' | 'low';
  sizes?: string;
  quality?: 'high' | 'medium' | 'low';
  onLoad?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  priority = 'low',
  sizes,
  quality = 'medium',
  onLoad
}) => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const { isLoaded, optimizedSrc } = useOptimizedImage(src, { 
    width, 
    priority,
    sizes,
    quality
  });

  return (
    <div ref={elementRef} className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      {isVisible && (
        <img
          src={optimizedSrc.src}
          srcSet={optimizedSrc.srcset}
          sizes={optimizedSrc.sizes}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading={priority === 'high' ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={onLoad}
        />
      )}
    </div>
  );
};

export default OptimizedImage;