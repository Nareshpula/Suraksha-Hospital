import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNavbarStyle } from '../../hooks/useNavbarStyle';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import Logo from './Logo';
import UserDisplay from './UserDisplay';
import NavbarLink from './NavbarLink';
import MobileMenu from './MobileMenu';
import LanguageDropdown from '../language/LanguageDropdown';
import { useTranslation } from '../language/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasStaffAccess, setHasStaffAccess] = useState(false);
  const { navbarBackground } = useNavbarStyle();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { translations } = useTranslation();
  const { user } = useAuth();

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    setIsOpen(false); // Close mobile menu if open
    logout();
    navigate('/login');
  };
  useEffect(() => {
    return () => setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const checkStaffAccess = async () => {
      if (!isAuthenticated || !user?.username) {
        setHasStaffAccess(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('staff_users')
          .select('role')
          .eq('username', user.username)
          .single();

        if (error) {
          console.error('Error checking staff access:', error);
          setHasStaffAccess(false);
          return;
        }

        setHasStaffAccess(!!data && ['admin', 'doctor', 'receptionist'].includes(data.role));
      } catch (err) {
        console.error('Failed to check staff access:', err);
        setHasStaffAccess(false);
      }
    };

    checkStaffAccess();
  }, [isAuthenticated, user?.username]);

  const navigateToHome = () => {
    navigate('/');
    window.scrollTo(0, 0);
    setIsOpen(false);
  };

  const navigateToAbout = () => {
    navigate('/about');
    setIsOpen(false);
  };

  const navigateToHealthTools = () => {
    navigate('/health-tools');
    setIsOpen(false);
  };

  const navigateToAppointments = () => {
    navigate('/appointments');
    setIsOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToSection: sectionId } });
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${navbarBackground}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Logo />
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavbarLink onClick={navigateToHome}>
              {translations?.nav?.home || 'Home'}
            </NavbarLink>
            <NavbarLink onClick={navigateToAbout}>
              {translations?.nav?.aboutUs || 'About Us'}
            </NavbarLink>
            <NavbarLink onClick={() => scrollToSection('services')}>
              {translations?.nav?.services || 'Services'}
            </NavbarLink>
            <NavbarLink onClick={() => scrollToSection('doctors')}>
              {translations?.nav?.doctors || 'Doctors'}
            </NavbarLink>
            <NavbarLink onClick={navigateToHealthTools}>
              {translations?.nav?.healthTools || 'Health Tools'}
            </NavbarLink>
            {hasStaffAccess && (
              <NavbarLink onClick={() => navigate('/appointments/search')}>
                Manage Appointments
              </NavbarLink>
            )}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-white font-medium">{user?.username}</span>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-emerald-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="text-white hover:text-emerald-200 transition-colors"
              >
                Login
              </button>
            )}
            <LanguageDropdown />
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center text-white"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <MobileMenu 
        isOpen={isOpen}
        onHomeClick={navigateToHome}
        onAboutClick={navigateToAbout}
        onSectionClick={scrollToSection}
        onClose={handleClose}
      />
    </header>
  );
};

export default Navbar;