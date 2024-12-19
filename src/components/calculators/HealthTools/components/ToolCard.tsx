import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({
  icon: Icon,
  title,
  description,
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
    >
      <div className="flex items-center justify-center mb-6">
        <div className="p-3 bg-violet-100 rounded-lg group-hover:bg-violet-200 transition-colors">
          <Icon className="w-8 h-8 text-violet-600" />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

export default ToolCard;