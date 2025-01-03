import React from 'react';
import { Stethoscope, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GeneralHealthcareHero = () => {
  const navigate = useNavigate();

  const handleBackToServices = () => {
    navigate('/', { state: { scrollToServices: true } });
  };

  return (
    <div className="relative bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-20">
      <div className="absolute inset-0">
        <img 
          src="https://images.pexels.com/photos/5998481/pexels-photo-5998481.jpeg"
          alt="General Healthcare"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/50 to-emerald-800/50" />
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
          <div className="p-3 bg-emerald-400/20 rounded-full">
            <Stethoscope className="w-12 h-12" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
          General Healthcare Services
        </h1>
        
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl text-emerald-100 mb-4">
            Comprehensive medical care led by Dr. Bysani Naveen Kumar (M.B.B.S., M.D.), 
            offering expert diagnosis and treatment for a wide range of health conditions
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeneralHealthcareHero;