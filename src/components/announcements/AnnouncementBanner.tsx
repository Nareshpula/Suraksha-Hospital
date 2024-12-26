import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { AlertCircle } from 'lucide-react';

interface Announcement {
  id: string;
  doctor_id: string;
  message: string;
  start_date: string;
  end_date: string;
  doctor?: {
    name: string;
  };
}

const AnnouncementBanner = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadAnnouncements = async () => {
      const now = new Date().toISOString();
      
      const { data, error } = await supabase
        .from('announcements')
        .select(`
          *,
          doctor:doctors(name)
        `)
        .lte('start_date', now)
        .lte('start_date', now)
        .lte('start_date', now)
        .gte('end_date', now);

      if (error) {
        console.error('Error loading announcements:', error);
        return;
      }

      if (!error && data) {
        setAnnouncements(data);
      }
    };

    loadAnnouncements();

    // Refresh announcements every minute
    const refreshInterval = setInterval(loadAnnouncements, 60000);

    // Set up real-time subscription
    const channel = supabase.channel('announcements_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'announcements' },
        (payload) => {
          console.log('Announcement change:', payload);
          loadAnnouncements();
        }
      )
      .subscribe();

    return () => {
      clearInterval(refreshInterval);
      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (announcements.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % announcements.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [announcements.length]);

  if (announcements.length === 0) return null;

  const currentAnnouncement = announcements[currentIndex];

  return (
    <div className="bg-rose-600 text-white py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-2">
          <AlertCircle className="w-5 h-5 animate-pulse" />
          <p className="text-sm font-medium animate-fade-in">
            {currentAnnouncement.doctor?.name}: {currentAnnouncement.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;