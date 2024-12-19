import { LucideIcon } from 'lucide-react';

export interface ServiceCategory {
  icon: LucideIcon;
  title: string;
  description: string;
  services: string[];
  benefits: string[];
  image: string;
}

export interface CategoryDetailsProps {
  category: ServiceCategory;
}

export interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
}