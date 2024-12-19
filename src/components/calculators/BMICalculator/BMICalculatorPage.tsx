import React from 'react';
import { ArrowLeft, Scale, Activity, Heart } from 'lucide-react';
import BackToToolsButton from '../../common/BackToToolsButton';
import BMIForm from './components/BMIForm';
import BMIRangeInfo from './components/BMIRangeInfo';
import HealthTips from './components/HealthTips';

const BMICalculatorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50 pt-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80"
            alt="BMI Calculator"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/50 to-teal-800/50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackToToolsButton className="mb-8" />

          <div className="flex items-center justify-center mb-8">
            <div className="p-3 bg-emerald-400/20 rounded-full">
              <Scale className="w-12 h-12" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            BMI Calculator
          </h1>
          
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto text-center">
            Calculate your Body Mass Index (BMI) and understand what it means for your health
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator Section */}
          <div>
            <BMIForm />
          </div>

          {/* Information Section */}
          <div className="space-y-8">
            <BMIRangeInfo />
            <HealthTips />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMICalculatorPage;