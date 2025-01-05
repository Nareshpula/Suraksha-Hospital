import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StaffUser } from '../types/auth';

const STAFF_USER_KEY = 'staffUser';

interface AuthContextType {
  user: StaffUser | null;
  setUser: (user: StaffUser | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<StaffUser | null>(() => {
    const storedUser = localStorage.getItem(STAFF_USER_KEY);
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Error parsing stored user:', error);
      localStorage.removeItem(STAFF_USER_KEY);
      return null;
    }
  });

  const isAuthenticated = !!user;

  // Update localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(STAFF_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STAFF_USER_KEY);
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    navigate('/login', { replace: true });
  };

  // Listen for auth changes
  useEffect(() => {
    const handleAuthChange = () => {
      const storedUser = localStorage.getItem(STAFF_USER_KEY);
      try {
        setUser(storedUser ? JSON.parse(storedUser) : null);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem(STAFF_USER_KEY);
        setUser(null);
        navigate('/login', { replace: true });
      }
    };

    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};