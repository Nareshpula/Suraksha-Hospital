import React from 'react';
import { useNavigate } from 'react-router-dom';
import PharmacyHero from './pharmacy/PharmacyHero';
import PharmacyServices from './pharmacy/PharmacyServices';
import PharmacyFeatures from './pharmacy/PharmacyFeatures';

const PharmacyServicesPage = () => {
  const navigate = useNavigate();

  const handleBackToServices = () => {
    navigate('/', { state: { scrollToServices: true } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-teal-50">
      <PharmacyHero onBack={handleBackToServices} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <PharmacyServices />
          <PharmacyFeatures />
        </div>
      </div>
    </div>
  );
};

export default PharmacyServicesPage;