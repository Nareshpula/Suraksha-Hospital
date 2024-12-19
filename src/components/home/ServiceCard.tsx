import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  image: string;
  hoverImage: string;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  color,
  bgColor,
  image,
  hoverImage,
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
    >
      <div className="absolute inset-0 transition-transform duration-700 ease-in-out group-hover:scale-110">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
        />
        <img
          src={hoverImage}
          alt={`${title} alternative`}
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      </div>

      <div className="relative p-6">
        <div className={`${bgColor} rounded-full p-4 inline-flex`}>
          <Icon className={`w-8 h-8 ${color}`} />
        </div>
        
        <h3 className="mt-4 text-xl font-semibold text-white">
          {title}
        </h3>
        
        <p className="mt-2 text-white/90">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;