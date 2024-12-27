import React from 'react';
import { Calendar, Siren } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ServiceCard from './ServiceCard';
import { useAppointment } from '../../hooks/useAppointment';

const AppointmentSection = () => {
  const navigate = useNavigate();
  const { openModal } = useAppointment();

  const services = [
    {
      icon: Calendar,
      title: 'Book an Appointment',
      description: 'Schedule a visit to our hospital',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600',
      hoverImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600',
      buttonText: 'Schedule Now',
      onClick: () => {
        navigate('/appointments');
      }
    },
    {
      icon: Siren,
      title: 'NICU Emergency',
      description: '24/7 Neonatal Intensive Care Unit',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&q=80&w=600',
      hoverImage: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&q=80&w=600',
      buttonText: 'Call NICU Emergency',
      onClick: () => window.location.href = 'tel:+919666426748'
    }
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0">
      <div className="bg-gradient-to-t from-black/80 via-black/60 to-transparent backdrop-blur-sm pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSection;