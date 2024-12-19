import React from 'react';
import { Bone, Activity, Stethoscope, Brain } from 'lucide-react';
import ServiceHero from './shared/ServiceHero';
import ServiceCard from './shared/ServiceCard';
import ServiceFeatures from './shared/ServiceFeatures';

const OrthopedicsPage = () => {
  const services = [
    {
      icon: Bone,
      title: "Joint Replacement",
      description: "Advanced total and partial joint replacement surgeries using the latest minimally invasive techniques"
    },
    {
      icon: Activity,
      title: "Sports Medicine",
      description: "Specialized treatment and rehabilitation programs for sports-related injuries and conditions"
    },
    {
      icon: Stethoscope,
      title: "Spine Surgery",
      description: "Expert care for spinal conditions with advanced surgical and non-surgical treatment options"
    },
    {
      icon: Brain,
      title: "Trauma Care",
      description: "24/7 emergency orthopedic trauma services with immediate response and expert care"
    }
  ];

  const features = [
    "Experienced orthopedic surgeons",
    "Latest surgical technologies",
    "Minimally invasive procedures",
    "Comprehensive rehabilitation programs",
    "Personalized treatment plans",
    "Advanced imaging facilities",
    "Sports medicine expertise",
    "Integrated pain management"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      <ServiceHero
        title="Orthopedic Surgery"
        description="State-of-the-art orthopedic care with advanced surgical procedures and comprehensive rehabilitation services."
        backgroundImage="https://images.unsplash.com/photo-1579684385127-1ef15d508118"
        accentColor="border-purple-600"
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
                <ServiceCard {...service} accentColor="border-purple-600" />
              </div>
            ))}
          </div>

          <ServiceFeatures features={features} accentColor="border-purple-600" />
        </div>
      </div>
    </div>
  );
};

export default OrthopedicsPage;