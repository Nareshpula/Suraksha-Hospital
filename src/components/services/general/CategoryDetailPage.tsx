import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { healthcareCategories } from './data/categories';

const CategoryDetailPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  
  const category = healthcareCategories.find(cat => cat.id === categoryId);

  if (!category) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="absolute inset-0">
          <img 
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/50 to-purple-800/50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate('/services/general-healthcare')}
            className="group flex items-center text-white/90 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to General Healthcare
          </button>

          <div className="flex items-center justify-center mb-8">
            <div className="p-3 bg-indigo-400/20 rounded-full">
              <category.icon className="w-12 h-12" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-center mb-6">{category.title}</h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto text-center">
            {category.description}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Services List */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <ul className="space-y-4">
                {category.services.map((service, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Benefits List */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us</h2>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <ul className="space-y-4">
                {category.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <button 
            onClick={() => navigate('/appointments')}
            className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Book an Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailPage;