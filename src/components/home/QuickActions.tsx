import React from 'react';
import { Calendar, Building2, Siren } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../language/LanguageContext';
import ActionCard from './cards/ActionCard';

const QuickActions = () => {
  const navigate = useNavigate();
  const { translations } = useTranslation();

  const actions = [
    {
      icon: Calendar,
      title: translations?.quickActions?.bookAppointment || 'Book Appointment',
      description: translations?.quickActions?.scheduleVisit || 'Schedule your visit',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      onClick: () => navigate('/appointments')
    },
    {
      icon: Building2,
      title: translations?.quickActions?.findHospital || 'Find Hospital',
      description: translations?.quickActions?.getDirections || 'Get directions to visit',
      color: 'text-olive-600',
      bgColor: 'bg-olive-50',
      onClick: () => {
        const locationSection = document.getElementById('location');
        if (locationSection) {
          locationSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    {
      icon: Siren,
      title: 'NICU Emergency',
      description: '24/7 Neonatal Care',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      onClick: () => window.location.href = 'tel:+919666426748'
    }
  ];

  return (
    <div className="absolute bottom-8 left-0 right-0 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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