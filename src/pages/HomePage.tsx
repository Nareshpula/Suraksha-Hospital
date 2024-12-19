import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/home/Hero';
import ImageCarousel from '../components/home/ImageCarousel';
import Services from '../components/home/Services';
import DoctorsPage from '../components/doctors/DoctorsPage';
import HealthTools from '../components/calculators/HealthTools';
import LocationSection from '../components/location/LocationSection';

const HomePage = () => {
  const location = useLocation();
  const servicesRef = useRef<HTMLDivElement>(null);
  const healthToolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle scroll to services section
    if (location.state?.scrollToServices && servicesRef.current) {
      setTimeout(() => {
        servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    
    // Handle scroll to health tools section
    if (location.state?.scrollToHealthTools && healthToolsRef.current) {
      setTimeout(() => {
        healthToolsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location.state]);

  return (
    <>
      <Hero />
      <ImageCarousel />
      <div ref={servicesRef}>
        <Services />
      </div>
      <DoctorsPage />
      <div ref={healthToolsRef}>
        <HealthTools />
      </div>
      <LocationSection />
    </>
  );
};

export default HomePage;