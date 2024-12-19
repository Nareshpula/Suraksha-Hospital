import React from 'react';
import { useImagePreloader } from '../../../hooks/useImagePreloader';

interface OptimizedServiceImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: 'high' | 'low';
  aspectRatio?: '16/9' | '4/3' | '1/1';
}

const OptimizedServiceImage: React.FC<OptimizedServiceImageProps> = ({
  src,
  alt,
  className = '',
  priority = 'low',
  aspectRatio = '16/9'
}) => {
  const { isLoaded } = useImagePreloader(src, {
    quality: priority === 'high' ? 'high' : 'medium',
    priority
  });

  const aspectRatioClass = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-4/3',
    '1/1': 'aspect-square'
  }[aspectRatio];

  return (
    <div className={`relative overflow-hidden ${className} ${aspectRatioClass}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={`${src}?auto=format&fit=crop&q=${priority === 'high' ? '85' : '75'}&w=${priority === 'high' ? '1920' : '800'}`}
        alt={alt}
        className={`w-full h-full object-cover object-center transition-all duration-500 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
        loading={priority === 'high' ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  );
};

export default OptimizedServiceImage;