import React from 'react';
import ServiceHero from '../shared/ServiceHero';

interface PharmacyHeroProps {
  onBack: () => void;
}

const PharmacyHero: React.FC<PharmacyHeroProps> = ({ onBack }) => {
  return (
    <ServiceHero
      title="Pharmacy Services"
      description="Round-the-clock pharmacy services with expert medication management and professional consultation."
      backgroundImage="https://images.unsplash.com/photo-1631549916768-4119b2e5f926"
      accentColor="border-teal-600"
      onBack={onBack}
    />
  );
};

export default PharmacyHero;