import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { paediatricServices } from '../data/services';

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  
  const service = paediatricServices.find(s => s.id === serviceId);
  
  if (!service) return null;

  const handleBack = () => {
    navigate('/services/paediatrics');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 pt-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="absolute inset-0">
          <img 
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-800/50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={handleBack}
            className="group flex items-center text-white/90 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Paediatrics Services
          </button>

          <div className="flex items-center justify-center mb-8">
            <div className="p-3 bg-blue-400/20 rounded-full">
              <service.icon className="w-12 h-12" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            {service.title}
          </h1>
          
          <p className="text-xl text-blue-100 max-w-3xl mx-auto text-center">
            {service.description}
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
                {service.details.map((detail, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Why Choose Us */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us</h2>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <ul className="space-y-4">
                {getServiceBenefits(service.id).map((benefit, index) => (
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
            onClick={() => document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Book an Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to get benefits based on service type
const getServiceBenefits = (serviceId: string): string[] => {
  const benefitsMap: Record<string, string[]> = {
    'general-paediatrics': [
      'Expert pediatric care from experienced specialists',
      'Child-friendly environment and facilities',
      'Comprehensive health monitoring and tracking',
      'Personalized care plans for each child'
    ],
    'vaccination': [
      'Latest vaccination protocols and guidelines',
      'Safe and sterile vaccination environment',
      'Complete vaccination documentation',
      'Expert guidance on vaccination schedules'
    ],
    'picu': [
      'State-of-the-art pediatric ICU facilities',
      '24/7 monitoring by specialized staff',
      'Advanced life support equipment',
      'Family-centered care approach'
    ],
    'newborn': [
      'Specialized newborn care expertise',
      'Modern facilities for newborn care',
      'Comprehensive newborn screening',
      'Expert lactation support'
    ],
    'nicu': [
      'Advanced NICU equipment and facilities',
      'Experienced neonatal care specialists',
      'Comprehensive support for premature babies',
      'Family involvement in care decisions'
    ]
  };

  return benefitsMap[serviceId] || [];
};

export default ServiceDetailPage;