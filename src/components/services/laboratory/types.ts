import { LucideIcon } from 'lucide-react';

export interface LaboratoryService {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  color: string;
  details: string[];
}