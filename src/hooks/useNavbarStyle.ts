import { useLocation } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';

export const useNavbarStyle = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      // Make the transition more sensitive by lowering the scroll threshold
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarBackground = useMemo(() => {
    // Always show solid background on non-home pages
    if (!isHomePage) {
      return 'bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg';
    }

    // Transparent at top of home page
    if (!isScrolled) {
      return 'bg-transparent';
    }

    // Gradient background with blur when scrolled on home page
    return 'bg-gradient-to-r from-emerald-500/95 to-emerald-600/95 backdrop-blur-sm shadow-lg';
  }, [isHomePage, isScrolled]);

  return {
    isScrolled,
    navbarBackground
  };
};