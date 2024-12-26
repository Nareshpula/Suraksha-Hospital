import React from 'react';
import { Siren, Baby, Activity, Heart, Shield, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmergencyServicesPage = () => {
  const navigate = useNavigate();

  const handleEmergencyCall = () => {
    window.location.href = 'tel:+919666426748';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50 pt-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-rose-500 to-pink-600 text-white py-20">
        <div className="absolute inset-0">
          <img 
            src="https://plus.unsplash.com/premium_photo-1664304442200-71a49a7357ee"
            alt="NICU Emergency Services"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-900/50 to-pink-900/50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate('/')}
            className="group flex items-center text-white/90 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Services
          </button>

          <div className="flex items-center justify-center mb-8">
            <div className="p-3 bg-rose-400/20 rounded-full">
              <Siren className="w-12 h-12" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            NICU Emergency Services
          </h1>
          
          <p className="text-xl text-rose-100 max-w-3xl mx-auto text-center">
            24/7 specialized neonatal and pediatric emergency care led by Dr. N. Swapna
            (M.B.B.S, MD, IAP-Fellowship in Neonatology)
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Doctor Profile */}
        <div className="mb-16">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0 md:w-96">
                <img
                  src="https://lqfwqgmcceameepaaces.supabase.co/storage/v1/object/public/suraksha-hospital-images/Dr.N.SWAPNA.jpg"
                  alt="Dr. N. Swapna"
                  className="h-full w-full object-cover md:h-full"
                />
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Dr. N. Swapna</h2>
                <p className="text-rose-600 font-semibold mb-4">
                  M.B.B.S, MD, IAP-Fellowship in Neonatology
                </p>
                <p className="text-gray-600 mb-6">
                  Specialized in neonatal and pediatric emergency care with extensive experience
                  in managing critical cases. Fellowship trained in Neonatology from Fernandez
                  Hospital, Hyderabad.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Shield className="w-5 h-5 mr-2 text-rose-500" />
                    <span>Senior Consultant Pediatrician</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Heart className="w-5 h-5 mr-2 text-rose-500" />
                    <span>NICU & PICU Specialist</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* NICU Services */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-rose-100 rounded-lg">
                <Baby className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-2xl font-bold ml-4">NICU Services</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span className="text-gray-600">Advanced neonatal life support systems</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span className="text-gray-600">24/7 monitoring by specialized staff</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span className="text-gray-600">Specialized care for premature babies</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span className="text-gray-600">State-of-the-art incubation facilities</span>
              </li>
            </ul>
          </div>

          {/* PICU Services */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-rose-100 rounded-lg">
                <Activity className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-2xl font-bold ml-4">PICU Services</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span className="text-gray-600">Pediatric intensive care facilities</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span className="text-gray-600">Critical care for children of all ages</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span className="text-gray-600">Advanced pediatric life support</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span className="text-gray-600">Continuous vital signs monitoring</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-16 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl shadow-lg p-8 text-white">
          <div className="text-center">
            <Siren className="w-12 h-12 mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold mb-4">24/7 Emergency Contact</h2>
            <div className="space-y-2">
              <button 
                onClick={handleEmergencyCall}
                className="text-xl bg-white/10 px-6 py-2 rounded-full hover:bg-white/20 transition-colors"
              >
                Emergency: 9666426748
              </button>
              <p className="text-xl">Reception: 08571-220345</p>
            </div>
            <p className="mt-4 text-rose-100">
              Our emergency response team is available 24/7 for immediate assistance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyServicesPage;