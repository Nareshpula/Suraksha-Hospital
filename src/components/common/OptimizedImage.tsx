import React from 'react';
import { useOptimizedImage } from '../../hooks/useOptimizedImage';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  priority?: 'high' | 'low';
  onLoad?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  priority = 'low',
  onLoad
}) => {
  const { isLoaded, optimizedSrc } = useOptimizedImage(src, { width, priority });

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={optimizedSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={priority === 'high' ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={onLoad}
      />
    </div>
  );
};

export default OptimizedImage;