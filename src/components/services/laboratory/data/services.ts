import { TestTube, Dna, Activity, Heart, Search } from 'lucide-react';

export const laboratoryServices = [
  {
    id: 'general-blood-tests',
    icon: TestTube,
    title: 'General Blood Tests',
    description: 'Comprehensive blood analysis including Complete Blood Count (CBC), Liver Function Tests (LFT), and more.',
    image: 'https://plus.unsplash.com/premium_photo-1661440316279-8a3c84015bb7',
    color: '#E8F3FF',
    details: [
      'Complete Blood Count (CBC)',
      'Liver Function Tests (LFT)',
      'Kidney Function Tests',
      'Blood Sugar Tests'
    ]
  },
  {
    id: 'specialized-blood-tests',
    icon: Dna,
    title: 'Specialized Blood Tests',
    description: 'Advanced blood testing including Thyroid Function Tests, Blood Sugar Levels, and Cholesterol Testing.',
    image: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg',
    color: '#F0E6FF',
    details: [
      'Thyroid Function Tests',
      'Lipid Profile',
      'HbA1c Testing',
      'Hormone Level Tests'
    ]
  },
  {
    id: 'advanced-diagnostics',
    icon: Search,
    title: 'Advanced Diagnostic Tests',
    description: 'Specialized diagnostic testing including Genetic Testing, Hormonal Imbalance Tests, and more.',
    image: 'https://images.pexels.com/photos/6629363/pexels-photo-6629363.jpeg',
    color: '#FFE6E6',
    details: [
      'Genetic Testing',
      'Hormonal Analysis',
      'Autoimmune Testing',
      'Cancer Markers'
    ]
  }
];