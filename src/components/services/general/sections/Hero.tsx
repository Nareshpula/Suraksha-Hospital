import React from 'react';
import { ArrowLeft, Stethoscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  onBack: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBack }) => {
  const navigate = useNavigate();
  
  return (
    <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=2070"
          alt="General Healthcare"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/50 to-teal-800/50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
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
          <p className="text-xl text-emerald-100 mb-8">
            Comprehensive medical care led by Dr. Bysani Naveen Kumar (M.B.B.S., M.D.), 
            offering expert diagnosis and treatment for a wide range of health conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;