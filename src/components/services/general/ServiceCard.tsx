import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ServiceCardProps } from './types';

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description, onClick }) => {
  return (
    <div className="group relative bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="relative p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="p-3 bg-white rounded-lg group-hover:bg-rose-100 transition-colors duration-300 shadow-md">
            <Icon className="w-8 h-8 text-rose-600" />
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">{title}</h3>
        <p className="text-gray-600 text-center mb-6">{description}</p>
        
        <button
          onClick={onClick}
          className="w-full flex items-center justify-center space-x-2 text-rose-600 hover:text-rose-700 transition-colors duration-300"
        >
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 opacity-50 transform rotate-45 translate-x-8 -translate-y-8" />
    </div>
  );
};

export default ServiceCard;