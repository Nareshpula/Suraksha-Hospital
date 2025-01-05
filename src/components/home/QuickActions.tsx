import React, { useEffect, useState } from 'react';
import { Calendar, Building2, Siren, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useTranslation } from '../language/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import ActionCard from '../common/ActionCard';

const DEBUG = import.meta.env.VITE_DEV_MODE === 'true';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  const { translations } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const [isPulsing, setIsPulsing] = useState(false);
  const [hasStaffAccess, setHasStaffAccess] = useState<boolean | null>(null);

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

  useEffect(() => {
    let pulseInterval: NodeJS.Timeout;
    let pulseTimeout: NodeJS.Timeout;

    // Start the animation cycle after initial delay
    const initialDelay = setTimeout(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 1000);

      // Set up recurring animation
      const interval = setInterval(() => {
        setIsPulsing(true);
        pulseTimeout = setTimeout(() => setIsPulsing(false), 1000);
      }, 5000); // Trigger every 5 seconds

      pulseInterval = interval;
    }, 2000); // Start after 2 seconds

    return () => {
      clearTimeout(initialDelay);
      clearInterval(pulseInterval);
      clearTimeout(pulseTimeout);
    };
  }, []);

  let actions = [
    {
      icon: Calendar,
      title: translations?.quickActions?.bookAppointment || 'Book Appointment',
      description: 'Schedule your visit',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      onClick: () => navigate('/appointments'),
      className: isPulsing ? 'animate-attention-pulse' : ''
    },
    {
      icon: Building2,
      title: translations?.quickActions?.findHospital || 'Find Hospital',
      description: 'Get directions to visit',
      color: 'text-olive-600',
      bgColor: 'bg-olive-50',
      onClick: () => {
        if (location.pathname === '/') {
          const locationSection = document.getElementById('location');
          if (locationSection) {
            locationSection.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          navigate('/', { state: { scrollToSection: 'location' } });
        }
      }
    },
    {
      icon: Siren,
      title: 'NICU Emergency',
      description: 'Emergency: 96666426748',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      onClick: () => window.location.href = 'tel:+919666426748'
    },
  ];

      icon: ClipboardList,
      title: 'Manage Appointments',
      description: 'Search and view appointments',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      onClick: () => navigate('/appointments/search'),
      className: 'hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1'
    }];
  }

  return (
    <div className="absolute bottom-8 left-0 right-0 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <div
              key={index}
              className="transform transition-all duration-300"
            >
              <ActionCard {...action} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;