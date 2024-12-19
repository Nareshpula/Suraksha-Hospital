import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  accentColor: string;
}

const ServiceCard = ({ icon: Icon, title, description, accentColor }: ServiceCardProps) => {
  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className={`p-6 border-l-4 ${accentColor}`}>
        <div className="flex items-start space-x-4">
          <div className={`p-3 ${accentColor.replace('border', 'bg')}/10 rounded-lg`}>
            <Icon className={`w-6 h-6 ${accentColor.replace('border', 'text')}`} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;