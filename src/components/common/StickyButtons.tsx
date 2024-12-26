import React from 'react';
import { Phone, Siren, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../language/LanguageContext';

const StickyButtons = () => {
  const navigate = useNavigate();
  const { translations } = useTranslation();

  const scrollToLocation = () => {
    const locationSection = document.getElementById('location');
    if (locationSection) {
      locationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEmergency = () => {
    window.location.href = 'tel:+919666426748';
  };

  return (
    <div className="fixed right-6 bottom-6 flex flex-col gap-4 z-50">
      <button
        onClick={() => navigate('/appointments')}
        className="group flex items-center gap-2 px-4 py-3 bg-rose-600 text-white rounded-full shadow-lg hover:bg-rose-700 transition-all duration-300 transform hover:scale-105"
      >
        <Calendar className="w-5 h-5" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap">
          Book Appointment
        </span>
      </button>
      <button
        onClick={scrollToLocation}
        className="group flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105"
      >
        <Phone className="w-5 h-5" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap">
          {translations?.common?.contactUs || 'Contact Us'}
        </span>
      </button>

      <button
        onClick={handleEmergency}
        className="group flex items-center gap-2 px-4 py-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 animate-pulse"
      >
        <Siren className="w-5 h-5" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap">
          {translations?.common?.emergency || 'Emergency'}
        </span>
      </button>
    </div>
  );
};

export default StickyButtons;