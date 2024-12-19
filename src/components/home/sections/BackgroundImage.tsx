import React from 'react';

interface BackgroundImageProps {
  image: {
    url: string;
    alt: string;
  };
  isActive: boolean;
  priority: 'high' | 'low';
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ image, isActive, priority }) => {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-1000
        ${isActive ? 'opacity-100' : 'opacity-0'}`}
      style={{ willChange: 'opacity' }}
    >
      <img
        src={image.url}
        alt={image.alt}
        className="w-full h-full object-cover"
        loading={priority === 'high' ? undefined : 'lazy'}
        decoding="async"
        importance={priority}
      />
    </div>
  );
};

export default BackgroundImage;