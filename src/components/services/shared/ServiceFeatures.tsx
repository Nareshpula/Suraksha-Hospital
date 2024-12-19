import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ServiceFeaturesProps {
  features: string[];
  accentColor: string;
}

const ServiceFeatures = ({ features, accentColor }: ServiceFeaturesProps) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Us</h2>
      <div className="space-y-6">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="flex items-center opacity-0 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CheckCircle className={`w-5 h-5 ${accentColor.replace('border', 'text')} mr-3 flex-shrink-0`} />
            <span className="text-gray-700">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceFeatures;