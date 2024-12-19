import { Baby, Heart, Siren, Pill, TestTube } from 'lucide-react';
import { ServiceType } from '../types/service';

export const useServices = (): ServiceType[] => {
  return [
    {
      icon: Heart,
      title: 'General Healthcare',
      description: "Comprehensive healthcare services with expertise in General Medicine, Physician & Diabetologist care.",
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600',
      hoverImage: 'https://images.pexels.com/photos/5215000/pexels-photo-5215000.jpeg'
    },
    {
      icon: Baby,
      title: 'Paediatrics',
      description: 'Expert pediatric care led by Dr. N. Swapna, providing comprehensive healthcare services for children.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      image: 'https://images.unsplash.com/photo-1632052999485-d748103abf98',
      hoverImage: 'https://images.unsplash.com/photo-1632053003385-245d2569568a'
    },
    {
      icon: TestTube,
      title: 'Laboratory Services',
      description: 'Advanced diagnostic testing with state-of-the-art equipment. Operating hours: 9 AM to 9 PM IST.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      image: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&q=80&w=600',
      hoverImage: 'https://images.pexels.com/photos/3735769/pexels-photo-3735769.jpeg'
    },
    {
      icon: Siren,
      title: 'NICU Emergency Services',
      description: '24/7 specialized neonatal and pediatric emergency care with expert medical team.',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      image: 'https://plus.unsplash.com/premium_photo-1664304442200-71a49a7357ee',
      hoverImage: 'https://plus.unsplash.com/premium_photo-1664304442200-71a49a7357ee'
    },
    {
      icon: Pill,
      title: 'Pharmacy Services',
      description: '24/7 pharmacy with comprehensive medication management and expert consultation.',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=600',
      hoverImage: 'https://images.pexels.com/photos/2919591/pexels-photo-2919591.jpeg'
    }
  ];
};