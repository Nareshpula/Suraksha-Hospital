import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ServiceCategory } from '../types';

interface CategoryCardProps {
  category: ServiceCategory;
  onLearnMore: (categoryId: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onLearnMore }) => {
  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={category.image}
          alt={category.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <div className="flex items-center space-x-2">
            <category.icon className="w-6 h-6" />
            <h3 className="text-lg font-semibold">{category.title}</h3>
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-600 mb-6">{category.description}</p>
        <button
          onClick={() => onLearnMore(category.id)}
          className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors group-hover:translate-x-1 duration-300"
        >
          <span className="font-medium">Learn More</span>
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;