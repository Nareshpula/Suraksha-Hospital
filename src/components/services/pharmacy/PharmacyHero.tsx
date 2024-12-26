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
      backgroundImage="https://lqfwqgmcceameepaaces.supabase.co/storage/v1/object/public/suraksha-hospital-images/Pharmacy.jpg?t=2024-12-26T08%3A17%3A36.954Z"
      accentColor="border-teal-600"
      onBack={onBack}
    />
  );
};

export default PharmacyHero;