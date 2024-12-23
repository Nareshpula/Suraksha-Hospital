import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useImageLoading } from '../../hooks/useImageLoading';
import { optimizeImageUrl } from '../../utils/imageOptimizer';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: 'high' | 'low';
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = 'low'
}) => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const optimizedSrc = optimizeImageUrl(src, { width, quality: priority === 'high' ? 85 : 75 });
  const { isLoading } = useImageLoading(isVisible ? optimizedSrc : '');

  return (
    <div 
      ref={elementRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      {isVisible && (
        <img
          src={optimizedSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          loading={priority === 'high' ? 'eager' : 'lazy'}
          decoding="async"
        />
      )}
    </div>
  );
};

export default LazyImage;