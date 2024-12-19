import { useState, useEffect } from 'react';

export const useNetworkStatus = () => {
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    const connection = (navigator as any).connection;
    
    const updateConnectionStatus = () => {
      if (connection) {
        const isSlowSpeed = connection.downlink < 2 || connection.effectiveType === '3g';
        setIsSlowConnection(isSlowSpeed);
      }
    };

    if (connection) {
      updateConnectionStatus();
      connection.addEventListener('change', updateConnectionStatus);
      
      return () => {
        connection.removeEventListener('change', updateConnectionStatus);
      };
    }
  }, []);

  return { isSlowConnection };
};