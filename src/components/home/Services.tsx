import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useServices } from '../../hooks/useServices';
import ServiceCard from './ServiceCard';

const Services = () => {
  const navigate = useNavigate();
  const services = useServices();

  const handleServiceClick = (title: string) => {
    switch (title) {
      case 'General Healthcare':
        navigate('/services/general-healthcare');
        break;
      case 'Paediatrics':
        navigate('/services/paediatrics');
        break;
      case 'Laboratory Services':
        navigate('/services/laboratory');
        break;
      case 'NICU Emergency Services':
        navigate('/services/emergency');
        break;
      case 'Pharmacy Services':
        navigate('/services/pharmacy');
        break;
      default:
        break;
    }
  };

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-pink-50 to-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Specialized healthcare services delivered by our expert team of doctors,
            combining years of experience with modern medical practices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <ServiceCard
                {...service}
                onClick={() => handleServiceClick(service.title)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;