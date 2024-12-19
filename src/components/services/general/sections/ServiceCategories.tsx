import React from 'react';
import { useNavigate } from 'react-router-dom';
import { healthcareCategories } from '../data/categories';
import CategoryCard from '../components/CategoryCard';
import SearchFilter from '../components/SearchFilter';

const ServiceCategories = () => {
  const navigate = useNavigate();
  const [filteredCategories, setFilteredCategories] = React.useState(healthcareCategories);

  const handleLearnMore = (categoryId: string) => {
    navigate(`/services/general-healthcare/${categoryId}`);
  };

  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Healthcare Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive medical care combining expertise in General Medicine, 
            Physician services, and specialized Diabetology care.
          </p>
        </div>

        <SearchFilter categories={healthcareCategories} onFilter={setFilteredCategories} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((category, index) => (
            <div
              key={category.id}
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CategoryCard 
                category={category}
                onLearnMore={handleLearnMore}
              />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-rose-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-rose-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
            Book an Appointment
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;