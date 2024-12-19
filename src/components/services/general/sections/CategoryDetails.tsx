import React from 'react';
import { ChevronDown } from 'lucide-react';
import { CategoryDetailsProps } from '../types';

const CategoryDetails: React.FC<CategoryDetailsProps> = ({ category }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between bg-emerald-50 hover:bg-emerald-100 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <category.icon className="w-6 h-6 text-emerald-600" />
          <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-emerald-600 transition-transform duration-300 ${
            isExpanded ? 'transform rotate-180' : ''
          }`} 
        />
      </button>
      
      {isExpanded && (
        <div className="px-6 py-4">
          <p className="text-gray-600 mb-4">{category.description}</p>
          <ul className="space-y-2">
            {category.services.map((service, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span className="text-gray-700">{service}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryDetails;