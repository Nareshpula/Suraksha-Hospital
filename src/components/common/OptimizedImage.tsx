import React from 'react';
import { useOptimizedImage } from '../../hooks/useOptimizedImage';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  priority?: 'high' | 'low';
  sizes?: string;
  onLoad?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  priority = 'low',
  sizes,
  onLoad
}) => {
  const { isLoaded, optimizedSrc } = useOptimizedImage(src, { 
    width, 
    priority,
    sizes 
  });

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
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
        fetchPriority={priority}
      />
    </div>
  );
};

export default OptimizedImage;