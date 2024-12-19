import React, { useState, useEffect, useCallback } from 'react';
import CarouselImage from './carousel/CarouselImage';
import CarouselControls from './carousel/CarouselControls';
import { carouselImages } from './carousel/carouselData';

const TRANSITION_DURATION = 700; // Match this with CSS duration
const AUTO_ADVANCE_DELAY = 5000;

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    setTimeout(() => setIsAnimating(false), TRANSITION_DURATION);
  }, [isAnimating]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    setTimeout(() => setIsAnimating(false), TRANSITION_DURATION);
  }, [isAnimating]);

  const handleDotClick = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), TRANSITION_DURATION);
  }, [isAnimating, currentIndex]);

  // Auto-advance timer
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      handleNext();
    }, AUTO_ADVANCE_DELAY);

    return () => clearInterval(timer);
  }, [handleNext, isPaused]);

  return (
    <div 
      className="relative h-screen w-full overflow-hidden bg-gray-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-full w-full">
        {carouselImages.map((image, index) => (
          <CarouselImage
            key={index}
            image={image}
            isActive={index === currentIndex}
            isPrev={index === ((currentIndex - 1 + carouselImages.length) % carouselImages.length)}
          />
        ))}
      </div>

      <CarouselControls
        onPrev={handlePrev}
        onNext={handleNext}
        currentIndex={currentIndex}
        totalImages={carouselImages.length}
        onDotClick={handleDotClick}
        isAnimating={isAnimating}
      />
    </div>
  );
};

export default ImageCarousel;