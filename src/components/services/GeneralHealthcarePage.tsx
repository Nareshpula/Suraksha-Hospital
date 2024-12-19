import React from 'react';
import GeneralHealthcareHero from './general/GeneralHealthcareHero';
import ServiceCategories from './general/ServiceCategories';
import DoctorProfile from './general/DoctorProfile';
import FAQSection from './general/sections/FAQSection';

const GeneralHealthcarePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50">
      <GeneralHealthcareHero />
      <div className="relative">
        <ServiceCategories />
        <DoctorProfile />
        <FAQSection />
      </div>
    </div>
  );
};

export default GeneralHealthcarePage;