import React, { memo } from 'react';
import { LucideIcon } from 'lucide-react';

interface ActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  onClick?: () => void;
}

const ActionCard = memo<ActionCardProps>(({
  icon: Icon,
  title,
  description,
  color,
  bgColor,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="group bg-white/90 backdrop-blur-sm rounded-lg p-2.5 w-fit min-w-[200px]
                 transition-all duration-300 hover:bg-white hover:shadow-md
                 hover:-translate-y-0.5 focus:outline-none focus:ring-2
                 focus:ring-offset-2 focus:ring-olive-500"
    >
      <div className="flex items-center space-x-3">
        <div
          className={`${bgColor} rounded-full p-1.5 transition-transform
                      duration-300 group-hover:scale-110`}
        >
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-800 leading-tight whitespace-nowrap">{title}</h3>
          <p className="text-xs text-gray-600 leading-tight whitespace-nowrap">{description}</p>
        </div>
      </div>
    </button>
  );
});

ActionCard.displayName = 'ActionCard';

export default ActionCard;