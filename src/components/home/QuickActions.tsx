import React from 'react';
import { Building2, Siren } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../language/LanguageContext';
import ActionCard from '../common/ActionCard';

const QuickActions = () => {
  const navigate = useNavigate();
  const { translations } = useTranslation();

  const actions = [
    {
      icon: Building2,
      title: translations?.quickActions?.findHospital || 'Find Hospital',
      description: 'Get directions to visit',
      color: 'text-olive-600',
      bgColor: 'bg-olive-50',
      onClick: () => {
        if (location.pathname === '/') {
          const locationSection = document.getElementById('location');
          if (locationSection) {
            locationSection.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          navigate('/', { state: { scrollToSection: 'location' } });
        }
      }
    },
    {
      icon: Siren,
      title: 'NICU Emergency',
      description: 'Emergency: 96666426748',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      onClick: () => window.location.href = 'tel:+919666426748'
    }
  ];

  return (
    <div className="absolute bottom-8 left-0 right-0 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <div
              key={index}
              className="transform transition-all duration-300"
            >
              <ActionCard {...action} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;