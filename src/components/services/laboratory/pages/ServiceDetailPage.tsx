import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { laboratoryServices } from '../data/services';

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  
  const service = laboratoryServices.find(s => s.id === serviceId);
  
  if (!service) return null;

  const handleBack = () => {
    navigate('/services/laboratory');
  };

  const benefits = getBenefits(service.id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50 pt-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20">
        <div className="absolute inset-0">
          <img 
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/50 to-purple-800/50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={handleBack}
            className="group flex items-center text-white/90 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Laboratory Services
          </button>

          <div className="flex items-center justify-center mb-8">
            <div className="p-3 bg-indigo-400/20 rounded-full">
              <service.icon className="w-12 h-12" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            {service.title}
          </h1>
          
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto text-center">
            {service.description}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Tests List */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Tests</h2>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <ul className="space-y-4">
                {service.details.map((detail, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us</h2>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
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
            className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Book a Test
          </button>
        </div>
      </div>
    </div>
  );
};

const getBenefits = (serviceId: string): string[] => {
  const benefitsMap: Record<string, string[]> = {
    'general-blood-tests': [
      'Quick and accurate results',
      'State-of-the-art testing equipment',
      'Experienced laboratory technicians',
      'Comprehensive test reports'
    ],
    'specialized-blood-tests': [
      'Advanced testing methodologies',
      'Expert analysis and interpretation',
      'Regular quality control checks',
      'Detailed diagnostic reports'
    ],
    'advanced-diagnostics': [
      'Cutting-edge diagnostic technology',
      'Specialized testing protocols',
      'Expert medical consultation',
      'Comprehensive result analysis'
    ]
  };

  return benefitsMap[serviceId] || [];
};

export default ServiceDetailPage;