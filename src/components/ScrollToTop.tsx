import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Immediately scroll to top without animation
    window.scrollTo(0, 0);
    
    // Reset any ongoing smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Restore smooth scroll behavior after a brief delay
    const timeout = setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'smooth';
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
};

export default ScrollToTop;