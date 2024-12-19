import React from 'react';
import { Baby, Heart, Shield, Clock } from 'lucide-react';
import ServiceHero from './shared/ServiceHero';
import ServiceCard from './shared/ServiceCard';
import ServiceFeatures from './shared/ServiceFeatures';

const MaternityCarePage = () => {
  const services = [
    {
      icon: Baby,
      title: "Prenatal Care",
      description: "Comprehensive prenatal checkups, ultrasound monitoring, and genetic screening"
    },
    {
      icon: Heart,
      title: "Labor & Delivery",
      description: "State-of-the-art delivery rooms with advanced fetal monitoring"
    },
    {
      icon: Shield,
      title: "High-Risk Pregnancy Care",
      description: "Specialized care for complicated pregnancies with 24/7 monitoring"
    },
    {
      icon: Clock,
      title: "Postnatal Care",
      description: "Dedicated support for mother and baby after delivery"
    }
  ];

  const features = [
    "Expert team of obstetricians and gynecologists",
    "Modern labor and delivery suites",
    "Advanced neonatal care unit",
    "Personalized birthing plans",
    "Lactation support services",
    "Prenatal classes and workshops",
    "24/7 emergency obstetric care",
    "Family-centered care approach"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50">
      <ServiceHero
        title="Maternity Care"
        description="Experience the joy of motherhood with our comprehensive maternity services, delivered with expertise and compassion."
        backgroundImage="https://images.unsplash.com/photo-1555252333-9f8e92e65df9"
        accentColor="border-pink-600"
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
                <ServiceCard {...service} accentColor="border-pink-600" />
              </div>
            ))}
          </div>

          <ServiceFeatures features={features} accentColor="border-pink-600" />
        </div>
      </div>
    </div>
  );
};

export default MaternityCarePage;