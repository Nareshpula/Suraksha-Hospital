import { Baby, Syringe, Activity, Heart, Star } from 'lucide-react';

export const paediatricServices = [
  {
    id: 'general-paediatrics',
    icon: Baby,
    title: 'General Paediatrics Services',
    description: 'Comprehensive pediatric care for children of all ages, from routine check-ups to specialized treatments.',
    image: 'https://images.pexels.com/photos/4025703/pexels-photo-4025703.jpeg',
    color: '#B4E4FF',
    details: [
      'Routine health check-ups and growth monitoring',
      'Treatment of common childhood illnesses',
      'Developmental assessment and guidance',
      'Pediatric consultations and follow-ups'
    ]
  },
  {
    id: 'vaccination',
    icon: Syringe,
    title: 'Vaccination Services',
    description: 'Complete vaccination programs following international immunization guidelines for children of all ages.',
    image: 'https://plus.unsplash.com/premium_photo-1661277662078-c1e73dec5881',
    color: '#E5D1FA',
    details: [
      'Routine immunization programs',
      'Catch-up vaccination schedules',
      'Vaccine counseling for parents',
      'International vaccination protocols'
    ]
  },
  {
    id: 'picu',
    icon: Activity,
    title: 'PICU (Pediatric Intensive Care Unit)',
    description: 'Advanced pediatric intensive care with 24/7 monitoring and specialized medical support.',
    image: 'https://plus.unsplash.com/premium_photo-1666299785666-b15701106335',
    color: '#95BDFF',
    details: [
      '24/7 intensive care monitoring',
      'Advanced life support systems',
      'Specialized pediatric equipment',
      'Expert critical care team'
    ]
  },
  {
    id: 'newborn',
    icon: Heart,
    title: 'Newborn Babies Treatment',
    description: 'Specialized care for newborns including routine check-ups and treatment of common conditions.',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=2070',
    color: '#FFB4B4',
    details: [
      'Newborn screening and assessment',
      'Jaundice management',
      'Feeding support and guidance',
      'Growth and development monitoring'
    ]
  },
  {
    id: 'nicu',
    icon: Star,
    title: 'NICU Facility & Treatment',
    description: 'State-of-the-art neonatal intensive care unit providing specialized care for premature and critically ill newborns.',
    image: 'https://plus.unsplash.com/premium_photo-1664304442200-71a49a7357ee',
    color: '#BFACE2',
    details: [
      'Premature baby care',
      'Advanced monitoring systems',
      'Specialized neonatal procedures',
      'Family-centered care approach'
    ]
  }
];