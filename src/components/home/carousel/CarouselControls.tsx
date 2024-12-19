import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselControlsProps {
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalImages: number;
  onDotClick: (index: number) => void;
  isAnimating: boolean;
}

const CarouselControls: React.FC<CarouselControlsProps> = ({
  onPrev,
  onNext,
  currentIndex,
  totalImages,
  onDotClick,
  isAnimating
}) => {
  return (
    <>
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-3 rounded-full 
                 hover:bg-white transition-colors z-20 disabled:opacity-50"
        aria-label="Previous slide"
        disabled={isAnimating}
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-3 rounded-full 
                 hover:bg-white transition-colors z-20 disabled:opacity-50"
        aria-label="Next slide"
        disabled={isAnimating}
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {Array.from({ length: totalImages }).map((_, index) => (
          <button
            key={index}
            onClick={() => !isAnimating && index !== currentIndex && onDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white w-6' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex}
            disabled={isAnimating}
          />
        ))}
      </div>
    </>
  );
};

export default CarouselControls;