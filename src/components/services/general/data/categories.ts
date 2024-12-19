import { Stethoscope, Heart, Shield, Activity, Gauge, Dna, Droplets } from 'lucide-react';
import { ServiceCategory } from '../types';

export const healthcareCategories: ServiceCategory[] = [
  {
    id: 'general-medical',
    icon: Stethoscope,
    title: "General Medical Care",
    description: "Comprehensive care for fevers, infections, respiratory issues, and digestive problems.",
    image: "https://images.pexels.com/photos/5858741/pexels-photo-5858741.jpeg",
    services: [
      "Fever & Infection Treatment",
      "Respiratory Care",
      "Digestive Health Management",
      "General Health Consultations"
    ],
    benefits: [
      "Expert Diagnosis",
      "Personalized Treatment Plans",
      "Regular Health Monitoring",
      "Preventive Care Guidance"
    ]
  },
  {
    id: 'thyroid',
    icon: Dna,
    title: "Thyroid Management",
    description: "Expert diagnosis and treatment of thyroid disorders with personalized care plans.",
    image: "https://images.pexels.com/photos/11352535/pexels-photo-11352535.jpeg",
    services: [
      "Thyroid Function Tests",
      "Hypothyroidism Treatment",
      "Hyperthyroidism Management",
      "Thyroid Nodule Evaluation"
    ],
    benefits: [
      "Specialized Thyroid Care",
      "Regular Monitoring",
      "Hormone Level Management",
      "Lifestyle Guidance"
    ]
  },
  {
    id: 'blood-pressure',
    icon: Gauge,
    title: "Blood Pressure Management",
    description: "Comprehensive care for hypertension and blood pressure-related conditions.",
    image: "https://images.pexels.com/photos/7659573/pexels-photo-7659573.jpeg",
    services: [
      "Blood Pressure Monitoring",
      "Hypertension Treatment",
      "Lifestyle Modification",
      "Medication Management"
    ],
    benefits: [
      "Regular BP Monitoring",
      "Personalized Treatment Plans",
      "Risk Assessment",
      "Prevention of Complications"
    ]
  },
  {
    id: 'cholesterol',
    icon: Droplets,
    title: "Cholesterol Management",
    description: "Expert care for lipid disorders and cholesterol-related health issues.",
    image: "https://plus.unsplash.com/premium_photo-1719363746302-24db30236d45",
    services: [
      "Lipid Profile Testing",
      "Cholesterol Treatment",
      "Diet Planning",
      "Cardiovascular Risk Management"
    ],
    benefits: [
      "Regular Monitoring",
      "Personalized Diet Plans",
      "Risk Factor Management",
      "Heart Health Optimization"
    ]
  },
  {
    id: 'diabetology',
    icon: Activity,
    title: "Diabetology Care",
    description: "Specialized diabetes management and complication prevention.",
    image: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?auto=format&fit=crop&q=80&w=2070",
    services: [
      "Blood Sugar Management",
      "Diabetic Care",
      "Complication Prevention",
      "Diet Planning"
    ],
    benefits: [
      "Expert Care",
      "Regular Monitoring",
      "Lifestyle Guidance",
      "Complication Prevention"
    ]
  },
  {
    id: 'preventive-care',
    icon: Shield,
    title: "Prevention Care",
    description: "Comprehensive health screenings and preventive measures for optimal wellness.",
    image: "https://images.pexels.com/photos/8617580/pexels-photo-8617580.jpeg",
    services: [
      "Health Check-ups",
      "Vaccinations",
      "Lifestyle Counseling",
      "Risk Assessment"
    ],
    benefits: [
      "Early Detection",
      "Disease Prevention",
      "Health Optimization",
      "Regular Monitoring"
    ]
  }
];