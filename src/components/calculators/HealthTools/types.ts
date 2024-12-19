import type { LucideIcon } from 'lucide-react';

export interface HealthTool {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  path: string;
  gradient: string;
}

export interface ToolCardProps extends HealthTool {
  onClick: () => void;
}