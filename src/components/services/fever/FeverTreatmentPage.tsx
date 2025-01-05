import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Thermometer, ArrowLeft, Stethoscope, Activity, Brain, Bug } from 'lucide-react';

const FeverTreatmentPage = () => {
  const navigate = useNavigate();

  const feverTypes = [
    {
      icon: Thermometer,
      title: 'General Fever Treatment',
      description: 'Comprehensive care for all types of fevers with expert diagnosis and treatment.',
      treatments: [
        'Thorough clinical evaluation',
        'Advanced diagnostic testing',
        'Targeted medication therapy',
        'Regular monitoring and follow-up'
      ]
    },
    {
      icon: Bug,
      title: 'Typhoid Fever',
      description: 'Expert treatment for typhoid fever with comprehensive care and monitoring.',
      treatments: [
        'Antibiotic therapy',
        'Fever management',
        'Hydration maintenance',
        'Dietary management'
      ]
    },
    {
      icon: Activity,
      title: 'Dengue Fever',
      description: 'Specialized care for dengue fever with close monitoring of vital parameters.',
      treatments: [
        'Platelet monitoring',
        'Fluid management',
        'Pain relief',
        'Critical care if needed'
      ]
    },
    {
      icon: Brain,
      title: 'Chikungunya Fever',
      description: 'Comprehensive treatment for chikungunya with focus on symptom management.',
      treatments: [
        'Joint pain management',
        'Anti-inflammatory therapy',
        'Rest and rehabilitation',
        'Supportive care'
      ]
    },
    {
      icon: Stethoscope,
      title: 'Malaria Fever',
      description: 'Expert treatment of malaria with appropriate antimalarial medications.',
      treatments: [
        'Antimalarial medication',
        'Fever control',
        'Complication prevention',
        'Regular blood tests'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50 pt-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-500 to-orange-600 text-white py-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80"
            alt="Fever Treatment"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/50 to-orange-800/50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => {
              if (location.pathname === '/') {
                const servicesSection = document.getElementById('services');
                if (servicesSection) {
                  servicesSection.scrollIntoView({ behavior: 'smooth' });
                }
              } else {
                navigate('/', { state: { scrollToSection: 'services' } });
              }
            }}
            className="group flex items-center text-white/90 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Services
          </button>

          <div className="flex items-center justify-center mb-8">
            <div className="p-3 bg-amber-400/20 rounded-full">
              <Thermometer className="w-12 h-12" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Fever Treatment Services
          </h1>
          
          <p className="text-xl text-amber-100 max-w-3xl mx-auto text-center">
            Expert care for all types of fevers with comprehensive diagnosis and treatment by Dr. Bysani Naveen Kumar
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {feverTypes.map((type, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <type.icon className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{type.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-6">{type.description}</p>
              
              <div className="space-y-3">
                {type.treatments.map((treatment, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full" />
                    <span className="text-gray-700">{treatment}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <button
            onClick={() => navigate('/appointments', { replace: true })}
            className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Book an Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeverTreatmentPage;