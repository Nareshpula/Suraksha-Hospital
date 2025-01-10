import React, { useState, useEffect } from 'react';
import { Phone, Siren, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../language/LanguageContext';

const StickyButtons = () => {
  const navigate = useNavigate();
  const { translations } = useTranslation();
  const [isBookingPulsing, setIsBookingPulsing] = useState(false);

  useEffect(() => {
    let pulseInterval: NodeJS.Timeout;
    let pulseTimeout: NodeJS.Timeout;

    // Start the animation cycle after initial delay
    const initialDelay = setTimeout(() => {
      setIsBookingPulsing(true);
      setTimeout(() => {
        setIsBookingPulsing(false);
      }, 1000);

      // Set up recurring animation
      pulseInterval = setInterval(() => {
        setIsBookingPulsing(true);
        pulseTimeout = setTimeout(() => {
          setIsBookingPulsing(false);
        }, 1000);
      }, 5000); // Trigger every 5 seconds
    }, 2000); // Start after 2 seconds

    return () => {
      clearTimeout(initialDelay);
      clearInterval(pulseInterval);
      clearTimeout(pulseTimeout);
    };
  }, []);

  const scrollToLocation = () => {
    if (location.pathname === '/') {
      const locationSection = document.getElementById('location');
      if (locationSection) {
        locationSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollToSection: 'location' } });
    }
  };

  return (
    <div className="fixed right-6 bottom-6 flex flex-col gap-4 z-50">
      {/* Book Appointment Button - with animation */}
      <button
        onClick={() => navigate('/appointments')}
        className={`group flex items-center gap-2 px-4 py-3 bg-rose-600 text-white rounded-full shadow-lg hover:bg-rose-700 transition-all duration-300 transform hover:scale-105 ${
          isBookingPulsing ? 'animate-attention-pulse' : ''
        }`}
      >
        <Calendar className="w-5 h-5" />
        <span className={`max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap ${
          isBookingPulsing ? 'max-w-xs' : ''
        }`}>
          Book Appointment
        </span>
      </button>

      {/* Contact Us Button - static with hover only */}
      <button
        onClick={scrollToLocation}
        className="group flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-all duration-300"
      >
        <Phone className="w-5 h-5" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap">
          {translations?.common?.contactUs || 'Contact Us'}
        </span>
      </button>

      {/* Emergency Button - static with hover only */}
      <button
        onClick={() => window.location.href = 'tel:+919666426748'}
        className="group flex items-center gap-2 px-4 py-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all duration-300"
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