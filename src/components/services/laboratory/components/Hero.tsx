import React from 'react';
import { TestTube, ArrowLeft, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleBackToServices = () => {
    navigate('/', { state: { scrollToServices: true } });
  };

  return (
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
          className="group flex items-center text-white/90 hover:text-white mb-8 transition-colors"
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
  );
};

export default Hero;