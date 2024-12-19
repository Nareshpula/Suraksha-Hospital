import React, { useEffect, useRef } from 'react';
import { useBackgroundTransition } from '../../../hooks/useBackgroundTransition';
import BackgroundImage from './BackgroundImage';

const heroBackgrounds = [
  {
    url: 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?auto=format&fit=crop&q=100&w=2070',
    alt: 'Father Holding Baby',
  },
  {
    url: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&q=100&w=2070',
    alt: 'Mother and Child Sharing a Laugh',
  },
  {
    url: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=100&w=2070',
    alt: 'Family Together',
  },
  {
    url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=100&w=2070',
    alt: 'Mother and Baby Bonding',
  }
];

const HeroBackground = () => {
  const { currentIndex } = useBackgroundTransition(heroBackgrounds);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {heroBackgrounds.map((bg, index) => (
        <div
          key={bg.url}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
            ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <img
            src={bg.url}
            alt={bg.alt}
            className="w-full h-full object-cover"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}
      
      <div 
        className="absolute inset-0 bg-gradient-to-b from-emerald-800/60 via-emerald-700/40 to-transparent"
        style={{ zIndex: 2 }}
      />
    </div>
  );
};

export default HeroBackground;