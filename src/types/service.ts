import { LucideIcon } from 'lucide-react';

export interface ServiceType {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  image: string;
  hoverImage: string;
  buttonText?: string;
  onClick?: () => void;
}