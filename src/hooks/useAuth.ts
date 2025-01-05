import { useState, useEffect } from 'react';
import { StaffUser } from '../types/auth';
import { supabase } from '../lib/supabase';

export const useAuth = () => {
  const [user, setUser] = useState<StaffUser | null>(null);

  const checkAuth = async () => {
    const staffUserStr = localStorage.getItem('staffUser');
    if (!staffUserStr) return false;
    
    try {
      const userData = JSON.parse(staffUserStr);
      return !!userData;
    } catch (err) {
      console.error('Failed to parse staff user:', err);
      return false;
    }
  };

  useEffect(() => {
    const staffUserStr = localStorage.getItem('staffUser');
    if (staffUserStr) {
      try {
        setUser(JSON.parse(staffUserStr));
      } catch (err) {
        console.error('Failed to parse staff user:', err);
        localStorage.removeItem('staffUser');
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('staffUser');
    setUser(null);
  };

  return {
    user,
    isAuthenticated: !!user,
    checkAuth,
    logout
  };
};