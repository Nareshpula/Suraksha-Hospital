import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from '../language/LanguageContext';
import HeroBackground from './sections/HeroBackground';
import QuickActions from './sections/QuickActions';

const Hero = () => {
  const { translations, isLoading } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  const showContent = useCallback(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      showContent();
    }
  }, [isLoading, showContent]);

  return (
    <div className="relative h-screen">
      <HeroBackground />
      <div className="relative z-10 flex flex-col items-center justify-center h-[70vh] text-white px-4">
        <h1 
          className={`text-4xl md:text-6xl font-bold text-center mb-6 transition-all duration-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {translations?.hero?.welcome || 'Welcome to Bysani Suraksha Speciality Hospital'}
        </h1>
        <p 
          className={`text-xl md:text-2xl text-center mb-16 max-w-3xl mx-auto transition-all duration-700 delay-200
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {translations?.hero?.subtitle || 'Where Advanced General Physician Diabetologist and Pediatric Care Meets Medical Excellence'}
        </p>
      </div>
      <QuickActions />
    </div>
  );
};

export default Hero;