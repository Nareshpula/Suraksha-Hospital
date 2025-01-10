import React from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceHero from '../shared/ServiceHero';

interface PharmacyHeroProps {
  onBack: () => void;
}

const PharmacyHero: React.FC<PharmacyHeroProps> = ({ onBack }) => {
  const navigate = useNavigate();

  const handleBackToServices = () => {
    navigate('/', { state: { scrollToSection: 'services' } });
  };

  return (
    <ServiceHero
      title="Pharmacy Services"
      description="Round-the-clock pharmacy services with expert medication management and professional consultation."
      backgroundImage="https://gatgyhxtgqmzwjatbmzk.supabase.co/storage/v1/object/sign/suraksha-hospital-images/Pharmacy.JPG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzdXJha3NoYS1ob3NwaXRhbC1pbWFnZXMvUGhhcm1hY3kuSlBHIiwiaWF0IjoxNzM2NTMwODIzLCJleHAiOjE3NjgwNjY4MjN9.QL_WJrYxa-khOnsbzusx-Vi1yxLjw4QSdRB-ebx8r1g&t=2025-01-10T17%3A40%3A23.701Z"
      accentColor="border-teal-600"
      onBack={handleBackToServices}
    />
  );
};

export default PharmacyHero;