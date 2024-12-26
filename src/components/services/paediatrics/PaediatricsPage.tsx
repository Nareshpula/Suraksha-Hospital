import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Baby, ArrowLeft, Award, BookOpen, Clock } from 'lucide-react';
import ServiceCard from './components/ServiceCard';
import { paediatricServices } from './data/services';

const PaediatricsPage = () => {
  const navigate = useNavigate();

  const handleBackToServices = () => {
    navigate('/', { state: { scrollToServices: true } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 pt-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1632052999485-d748103abf98"
            alt="Paediatrics"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-800/50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={handleBackToServices}
            className="group flex items-center text-white/90 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Services
          </button>

          <div className="flex items-center justify-center mb-8">
            <div className="p-3 bg-blue-400/20 rounded-full">
              <Baby className="w-12 h-12" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Paediatrics Services
          </h1>
          
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl text-blue-100 mb-8">
              Expert pediatric care led by Dr. N. Swapna (M.B.B.S, MD, IAP-Fellowship in Neonatology), 
              providing comprehensive healthcare services for children from newborns to adolescents.
            </p>
          </div>
        </div>
      </div>

      {/* Doctor Profile Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://lqfwqgmcceameepaaces.supabase.co/storage/v1/object/public/suraksha-hospital-images/Dr.N.SWAPNA.jpg"
                alt="Dr. N. Swapna"
                className="rounded-lg shadow-2xl"
              />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Meet Our Expert
              </h2>
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                Dr. N. Swapna
              </h3>
              <p className="text-gray-600 mb-8">
                M.B.B.S, MD, IAP-Fellowship in Neonatology
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Award className="w-6 h-6 text-blue-600" />
                  <span className="text-gray-700">Senior Consultant Paediatrician</span>
                </div>
                <div className="flex items-center space-x-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  <span className="text-gray-700">Specialized in Neonatal Care</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <span className="text-gray-700">Available Mon-Sat, 10:00 AM - 3:30 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive pediatric care services designed to ensure the health and well-being of your children
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paediatricServices.map((service, index) => (
            <div
              key={service.id}
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaediatricsPage;