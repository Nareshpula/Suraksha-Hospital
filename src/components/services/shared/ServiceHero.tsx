import React from 'react';
import { ArrowLeft } from 'lucide-react';
import OptimizedServiceImage from './OptimizedServiceImage';

interface ServiceHeroProps {
  title: string;
  description: string;
  backgroundImage: string;
  accentColor: string;
  onBack: () => void;
}

const ServiceHero: React.FC<ServiceHeroProps> = ({
  title,
  description,
  backgroundImage,
  accentColor,
  onBack
}) => {
  return (
    <div className="relative h-[60vh] overflow-hidden">
      <div className="absolute inset-0">
        <OptimizedServiceImage
          src={backgroundImage}
          alt={title}
          className="w-full h-full"
          priority="high"
        />
      </div>
      <div 
        className={`absolute inset-0 ${accentColor.replace('border', 'bg')}/90 
        backdrop-blur-sm flex items-center transition-opacity duration-500`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <button 
            onClick={onBack}
            className="flex items-center text-white mb-8 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Services
          </button>
          <h1 className="text-5xl font-bold text-white mb-6 opacity-0 animate-fade-in">
            {title}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl opacity-0 animate-fade-in-delayed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceHero;