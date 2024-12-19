import React from 'react';

interface FallbackImageProps {
  show: boolean;
}

const FallbackImage: React.FC<FallbackImageProps> = ({ show }) => (
  <img
    src="https://images.unsplash.com/photo-1559721853-0da6e4b92d8e?auto=format&fit=crop&q=80&w=1920"
    alt="Mother and Baby"
    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
      show ? 'opacity-100' : 'opacity-0'
    }`}
  />
)

export default FallbackImage;