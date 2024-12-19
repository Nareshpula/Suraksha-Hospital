import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  gradient: string;
  onClick: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({
  icon: Icon,
  title,
  description,
  image,
  gradient,
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
    >
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${gradient} to-transparent`} />
        <div className="absolute bottom-4 left-4 text-white">
          <div className="flex items-center mb-2">
            <Icon className="w-6 h-6 mr-2" />
            <h3 className="text-xl font-semibold">{title}</h3>
          </div>
          <p className="text-white/90">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;