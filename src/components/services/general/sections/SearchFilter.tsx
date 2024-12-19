import React from 'react';
import { Search } from 'lucide-react';
import { ServiceCategory } from '../types';

interface SearchFilterProps {
  categories: ServiceCategory[];
  onFilter: (filtered: ServiceCategory[]) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ categories, onFilter }) => {
  const handleSearch = (term: string) => {
    const filtered = categories.filter(category => 
      category.title.toLowerCase().includes(term.toLowerCase()) ||
      category.description.toLowerCase().includes(term.toLowerCase()) ||
      category.services.some(service => 
        service.toLowerCase().includes(term.toLowerCase())
      )
    );
    onFilter(filtered);
  };

  return (
    <div className="relative max-w-md mx-auto mb-12">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search health conditions or services..."
          className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
        />
      </div>
    </div>
  );
};

export default SearchFilter;