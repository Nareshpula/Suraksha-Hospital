import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ServiceCategory } from '../types';

interface CategoryCardProps {
  category: ServiceCategory;
  onLearnMore: (categoryId: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onLearnMore }) => {
  // Color mapping for each category with exact specified colors
  const categoryColors = {
    'general-medical': '#E7A284',
    'thyroid': '#D07386',
    'blood-pressure': '#E89086',
    'cholesterol': '#E96154',
    'diabetology': '#F58C22',
    'preventive-care': '#FDF8E1'
  } as const;

  const backgroundColor = categoryColors[category.id as keyof typeof categoryColors] || categoryColors['general-medical'];

  return (
    <div 
      className="group relative rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      style={{ backgroundColor }}
    >
      {/* Background Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={category.image}
          alt={category.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div 
          className="absolute inset-0" 
          style={{ 
            background: `linear-gradient(to bottom, transparent, ${backgroundColor})`
          }} 
        />
      </div>

      {/* Content */}
      <div className="relative p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 rounded-lg bg-white/20">
            <category.icon className="w-6 h-6 text-gray-800" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            {category.title}
          </h3>
        </div>

        <p className="mb-6 text-gray-700">
          {category.description}
        </p>

        <button
          onClick={() => onLearnMore(category.id)}
          className="flex items-center space-x-2 text-gray-800 hover:text-gray-900 transition-colors duration-300 group"
        >
          <span className="font-medium">Learn More</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Decorative Element */}
      <div 
        className="absolute top-0 right-0 w-24 h-24 transform rotate-45 translate-x-12 -translate-y-12"
        style={{ backgroundColor: `${backgroundColor}33` }}
      />
    </div>
  );
};

export default CategoryCard;