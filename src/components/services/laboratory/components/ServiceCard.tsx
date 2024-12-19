import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { LaboratoryService } from '../types';

interface ServiceCardProps extends LaboratoryService {}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  icon: Icon,
  title,
  description,
  image,
  color
}) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/services/laboratory/${id}`);
  };

  return (
    <div 
      className="group relative rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      style={{ backgroundColor: color }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="relative p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 rounded-lg bg-white/20">
            <Icon className="w-6 h-6 text-gray-800" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            {title}
          </h3>
        </div>

        <p className="mb-6 text-gray-700">
          {description}
        </p>

        <button
          onClick={handleViewDetails}
          className="flex items-center space-x-2 text-gray-800 hover:text-gray-900 transition-colors duration-300 group"
        >
          <span className="font-medium">Learn More</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;