import React from 'react';
import ServiceFeatures from '../shared/ServiceFeatures';

const features = [
  "24/7 pharmacy services",
  "Comprehensive medication inventory",
  "Expert pharmacist consultation",
  "Digital prescription management",
  "Medication therapy management",
  "Healthcare products available",
  "Insurance coordination",
  "Home delivery services"
];

const PharmacyFeatures = () => {
  return <ServiceFeatures features={features} accentColor="border-teal-600" />;
};

export default PharmacyFeatures;