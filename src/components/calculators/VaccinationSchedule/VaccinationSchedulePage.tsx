import React from 'react';
import { Syringe } from 'lucide-react';
import BackToToolsButton from '../../common/BackToToolsButton';
import VaccinationForm from './components/VaccinationForm';
import VaccinationSchedule from './components/VaccinationSchedule';
import VaccinationInfo from './components/VaccinationInfo';

const VaccinationSchedulePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50 pt-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-rose-400 to-pink-500 text-white py-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1632053003385-245d2569568a?auto=format&fit=crop&q=80"
            alt="Vaccination Schedule"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/50 to-pink-600/50 backdrop-blur-sm" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackToToolsButton className="mb-8" />

          <div className="flex items-center justify-center mb-8">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <Syringe className="w-12 h-12" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Child Vaccination Schedule
          </h1>
          
          <p className="text-xl text-rose-100 max-w-3xl mx-auto text-center">
            Track your child's vaccination schedule and ensure timely immunization for optimal protection
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <VaccinationForm />
          </div>
          <div className="space-y-8">
            <VaccinationSchedule />
            <VaccinationInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaccinationSchedulePage;