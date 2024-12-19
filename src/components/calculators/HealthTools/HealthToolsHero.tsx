import React from 'react';
import { Activity, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HealthToolsHero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-r from-violet-500 to-purple-600 text-white py-20">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070"
          alt="Health Tools"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/50 to-purple-800/50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate('/')}
          className="group flex items-center text-white/90 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </button>

        <div className="text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <Activity className="w-12 h-12" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Wellness Hub
          </h1>
          
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Access our comprehensive suite of healthcare calculators and wellness tools designed to support your health journey
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthToolsHero;