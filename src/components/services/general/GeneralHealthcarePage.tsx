import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from './sections/Hero';
import ServiceCategories from './sections/ServiceCategories';
import DoctorProfile from './sections/DoctorProfile';
import FAQSection from './sections/FAQSection';
import StickyNavigation from './sections/StickyNavigation';

const GeneralHealthcarePage = () => {
  const navigate = useNavigate();

  const handleBackToServices = () => {
    navigate('/', { state: { scrollToServices: true } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50">
      <Hero onBack={handleBackToServices} />
      <div className="relative">
        <StickyNavigation />
        <ServiceCategories />
        <DoctorProfile />
        <FAQSection />
      </div>
    </div>
  );
};

export default GeneralHealthcarePage;