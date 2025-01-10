import React, { useState, useEffect } from 'react';
import { Menu, Home, Info, Stethoscope, Users, Activity, Calendar, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import MobileLanguageSelector from '../mobile/MobileLanguageSelector';
import { useTranslation } from '../language/LanguageContext';

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
  const { user, isAuthenticated, logout } = useAuth();
  const [hasStaffAccess, setHasStaffAccess] = useState(false);

  useEffect(() => {
    const checkStaffAccess = async () => {
      if (!isAuthenticated || !user?.username) {
        setHasStaffAccess(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('staff_users')
          .select('id')
          .eq('username', user.username)
          .single();

        if (error) {
          console.error('Error checking staff access:', error);
          setHasStaffAccess(false);
          return;
        }

        setHasStaffAccess(!!data);
      } catch (err) {
        console.error('Failed to check staff access:', err);
        setHasStaffAccess(false);
      }
    };

    checkStaffAccess();
  }, [isAuthenticated, user?.username]);

  if (!isOpen) return null;

  const handleHealthToolsClick = () => {
    onClose();
    navigate('/health-tools', { replace: true });
  };

  const menuItems = [
    { icon: Home, label: translations?.nav?.home || 'Home', onClick: onHomeClick },
    { icon: Calendar, label: translations?.quickActions?.bookAppointment || 'Book Appointment', onClick: () => navigate('/appointments') },
    { icon: Info, label: translations?.nav?.aboutUs || 'About Us', onClick: onAboutClick },
    { icon: Stethoscope, label: translations?.nav?.services || 'Services', onClick: () => onSectionClick('services') },
    { icon: Users, label: translations?.nav?.doctors || 'Doctors', onClick: () => onSectionClick('doctors') },
    { icon: Activity, label: translations?.nav?.healthTools || 'Health Tools', onClick: handleHealthToolsClick },
  ];

  return (
    <nav className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-gradient-to-b from-emerald-500/95 to-emerald-600/95 backdrop-blur-sm z-50">
      <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {isAuthenticated && (
            <div className="px-4 py-3 mb-3 bg-emerald-800/20 backdrop-blur-sm rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <User className="w-5 h-5 text-white/80 mr-2" />
                <span className="text-white font-medium">{user?.username}</span>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => {
                    logout();
                    onClose();
                    navigate('/login');
                  }}
                  className="flex items-center text-white hover:text-emerald-200 transition-colors"
                >
                  <LogOut className="w-5 h-5 mr-1" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}

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
          {hasStaffAccess && (
            <button
              onClick={() => {
                navigate('/appointments/search');
                onClose();
              }}
              className="flex items-center w-full text-left px-4 py-2 text-white hover:bg-emerald-600/50 rounded-md transition-colors"
            >
              <Calendar className="w-5 h-5 mr-3" />
              <span>Manage Appointments</span>
            </button>
          )}
        </div>
        
        <div className="border-t border-emerald-400/30 px-2 pt-2 pb-3">
          {!isAuthenticated && (
            <div className="px-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/login');
                  onClose();
                }}
                className="flex items-center w-full justify-center px-4 py-3 text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-md"
              >
                <User className="w-5 h-5 mr-2" />
                Login
              </button>
            </div>
          )}
        </div>

        <div className="border-t border-emerald-400/30 mt-2">
          <MobileLanguageSelector />
        </div>
      </div>
    </nav>
  );
};

export default MobileMenu;