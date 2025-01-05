import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { StaffRole } from '../../types/auth';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: StaffRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkStaffAccess = async () => {
      if (!isAuthenticated || !user?.username) {
        setHasAccess(false);
        setIsLoading(false);
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
          setHasAccess(false);
        } else {
          const hasRole = allowedRoles.includes(data.role as StaffRole);
          console.log('Role check:', { username: user.username, role: data.role, allowed: hasRole });
          setHasAccess(hasRole);
        }
      } catch (err) {
        console.error('Failed to check staff access:', err);
        setHasAccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkStaffAccess();
  }, [isAuthenticated, user?.username]);

  // Show loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !hasAccess) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to home if user doesn't have required role
  return <>{children}</>;
};

export default ProtectedRoute;