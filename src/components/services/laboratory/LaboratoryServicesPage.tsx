import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TestTube, ArrowLeft, Clock } from 'lucide-react';
import ServiceCard from './components/ServiceCard';
import { laboratoryServices } from './data/services';

const LaboratoryServicesPage = () => {
  const navigate = useNavigate();

  const handleBackToServices = () => {
    navigate('/', { state: { scrollToSection: 'services' } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50 pt-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&q=80&w=2070"
            alt="Laboratory Services"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/50 to-purple-800/50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={handleBackToServices}
            className="group flex items-center text-white/90 hover:text-white mb-8 transition-colors focus:outline-none"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Services
          </button>

          <div className="flex items-center justify-center mb-8">
            <div className="p-3 bg-indigo-400/20 rounded-full">
              <TestTube className="w-12 h-12" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Laboratory Services
          </h1>
          
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl text-indigo-100 mb-4">
              Comprehensive diagnostic testing services with state-of-the-art equipment and expert analysis
            </p>
            <div className="flex items-center justify-center space-x-2 text-indigo-200">
              <Clock className="w-5 h-5" />
              <span>Operating Hours: 9 AM to 9 PM IST</span>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced diagnostic testing services with quick and accurate results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {laboratoryServices.map((service, index) => (
            <div
              key={service.id}
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center space-x-6">
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
            Book a Test
          </button>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition-colors duration-300 shadow-lg hover:shadow-xl border border-indigo-200">
            Request More Information
          </button>
        </div>
      </div>
    </div>
  );
};

export default LaboratoryServicesPage;