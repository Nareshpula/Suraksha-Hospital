import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { format } from 'date-fns';

const AvailabilityBanner = () => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadExceptions = async () => {
      const today = format(new Date(), 'yyyy-MM-dd');
      
      const { data: doctors } = await supabase
        .from('doctors')
        .select('name, availability');

      if (doctors) {
        const todayNotifications = doctors.reduce((acc: string[], doctor) => {
          const exceptions = doctor.availability?.exceptions || [];
          const todayException = exceptions.find(e => e.date === today);
          
          if (todayException) {
            acc.push(`Dr. ${doctor.name} is ${todayException.reason}`);
          }
          return acc;
        }, []);

        setNotifications(todayNotifications);
      }
    };

    loadExceptions();
  }, []);

  useEffect(() => {
    if (notifications.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % notifications.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [notifications.length]);

  if (notifications.length === 0) return null;

  return (
    <div className="bg-rose-600 text-white py-2 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center">
          <p className="text-sm font-medium animate-fade-in">
            {notifications[currentIndex]}
          </p>
        </div>
      </div>
    </div>
  );
};