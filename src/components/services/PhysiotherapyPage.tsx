import React from 'react';
import { Activity, Dumbbell, Heart, Brain } from 'lucide-react';
import ServiceHero from './shared/ServiceHero';
import ServiceCard from './shared/ServiceCard';
import ServiceFeatures from './shared/ServiceFeatures';

const PhysiotherapyPage = () => {
  const services = [
    {
      icon: Activity,
      title: "Sports Rehabilitation",
      description: "Specialized rehabilitation programs designed for athletes and sports-related injuries"
    },
    {
      icon: Dumbbell,
      title: "Musculoskeletal Therapy",
      description: "Expert treatment for muscle, joint, and bone conditions with personalized care plans"
    },
    {
      icon: Heart,
      title: "Cardiac Rehabilitation",
      description: "Comprehensive recovery programs for heart surgery and cardiac conditions"
    },
    {
      icon: Brain,
      title: "Neurological Rehabilitation",
      description: "Specialized therapy for stroke recovery and various neurological conditions"
    }
  ];

  const features = [
    "Experienced physiotherapists",
    "State-of-the-art rehabilitation equipment",
    "Personalized treatment programs",
    "Evidence-based therapy techniques",
    "Sports injury specialization",
    "Post-surgery rehabilitation",
    "Ergonomic assessment services",
    "Preventive care programs"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <ServiceHero
        title="Physiotherapy"
        description="Expert rehabilitation services with personalized treatment plans for optimal recovery and improved quality of life."
        backgroundImage="https://images.pexels.com/photos/5473182/pexels-photo-5473182.jpeg"
        accentColor="border-blue-600"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Services</h2>
            {services.map((service, index) => (
              <div
                key={index}
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <ServiceCard {...service} accentColor="border-blue-600" />
              </div>
            ))}
          </div>

          <ServiceFeatures features={features} accentColor="border-blue-600" />
        </div>
      </div>
    </div>
  );
};

export default PhysiotherapyPage;