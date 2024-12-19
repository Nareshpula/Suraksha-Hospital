import React from 'react';
import { Menu, Home, Info, Stethoscope, Users, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../language/LanguageContext';
import MobileLanguageSelector from '../mobile/MobileLanguageSelector';

interface MobileMenuProps {
  isOpen: boolean;
  onHomeClick: () => void;
  onAboutClick: () => void;
  onSectionClick: (sectionId: string) => void;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  onHomeClick,
  onAboutClick,
  onSectionClick,
  onClose 
}) => {
  const navigate = useNavigate();
  const { translations } = useTranslation();

  if (!isOpen) return null;

  const handleHealthToolsClick = () => {
    onClose();
    navigate('/health-tools', { replace: true });
  };

  const menuItems = [
    { icon: Home, label: translations?.nav?.home || 'Home', onClick: onHomeClick },
    { icon: Info, label: translations?.nav?.aboutUs || 'About Us', onClick: onAboutClick },
    { icon: Stethoscope, label: translations?.nav?.services || 'Services', onClick: () => onSectionClick('services') },
    { icon: Users, label: translations?.nav?.doctors || 'Doctors', onClick: () => onSectionClick('doctors') },
    { icon: Activity, label: translations?.nav?.healthTools || 'Health Tools', onClick: handleHealthToolsClick },
  ];

  return (
    <nav className="md:hidden fixed inset-x-0 top-16 bg-gradient-to-b from-emerald-500/95 to-emerald-600/95 backdrop-blur-sm z-50">
      <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="flex items-center w-full text-left px-4 py-2 text-white hover:bg-emerald-600/50 rounded-md transition-colors"
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="border-t border-emerald-400/30 mt-2">
          <MobileLanguageSelector />
        </div>
      </div>
    </nav>
  );
};

export default MobileMenu;