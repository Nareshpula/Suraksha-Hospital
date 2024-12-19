import React from 'react';

interface CarouselImageProps {
  image: {
    url: string;
    alt: string;
    caption: string;
  };
  isActive: boolean;
  isPrev: boolean;
}

const CarouselImage: React.FC<CarouselImageProps> = ({ image, isActive, isPrev }) => {
  if (!isActive && !isPrev) return null;

  return (
    <div
      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
        isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
      }`}
    >
      <img
        src={`${image.url}?auto=format&fit=crop&q=80&w=1920`}
        alt={image.alt}
        className="h-full w-full object-cover"
        loading={isActive ? 'eager' : 'lazy'}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <h3 className="text-3xl font-bold text-white mb-2 opacity-0 animate-fade-in">
          {image.caption}
        </h3>
      </div>
    </div>
  );
};

export default CarouselImage;