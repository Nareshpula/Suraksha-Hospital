import React from 'react';
import { Clock, Pill, ShieldCheck, Stethoscope } from 'lucide-react';
import ServiceCard from '../shared/ServiceCard';
import { PharmacyService } from '../../../types/pharmacy';

const services: PharmacyService[] = [
  {
    icon: Clock,
    title: "24/7 Pharmacy",
    description: "Round-the-clock access to essential medications and healthcare products"
  },
  {
    icon: Pill,
    title: "Prescription Services",
    description: "Expert pharmacists providing comprehensive medication management"
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description: "Stringent quality control and authentic medication sourcing"
  },
  {
    icon: Stethoscope,
    title: "Medication Counseling",
    description: "Professional guidance on medication usage and potential interactions"
  },
  {
    icon: Stethoscope,
    title: "Get Your Medicines Delivered to Your Doorstep",
    description: "Get medicines delivered to your doorstep..! Please Call: 9666426748, Landline: 08571-220345"
  }
];

const PharmacyServices = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Services</h2>
      {services.map((service, index) => (
        <div
          key={index}
          className="opacity-0 animate-fade-in"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <ServiceCard {...service} accentColor="border-teal-600" />
        </div>
      ))}
    </div>
  );
};

export default PharmacyServices;