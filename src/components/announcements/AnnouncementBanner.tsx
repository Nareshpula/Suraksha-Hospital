import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { AlertCircle } from 'lucide-react';
import { toIST } from '../../utils/dateTime';

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
      // Get current time in UTC for comparison with stored UTC timestamps
      const now = new Date();
      const istNow = toIST(now);
      
      console.log('Loading announcements at UTC:', now.toISOString());
      console.log('Loading announcements at IST:', istNow.toISOString());
      
      const { data, error } = await supabase
        .from('announcements')
        .select(`
          *,
          doctor:doctors(name)
        `)
        .lte('start_date', istNow.toISOString()) // start_date <= now (IST)
        .gte('end_date', istNow.toISOString())   // end_date >= now (IST)
        .order('start_date', { ascending: true });

      if (error) {
        console.error('Error loading announcements:', error);
        return;
      }

      if (data && data.length > 0) {
        console.log('Loaded announcements:', data.map(a => ({
          ...a,
          start_date_ist: new Date(a.start_date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          end_date_ist: new Date(a.end_date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        })));
        setAnnouncements(data);
      } else {
        console.log('No active announcements found');
        setAnnouncements([]);
      }
    };

    // Initial load
    loadAnnouncements();

    // Refresh announcements every minute
    const refreshInterval = setInterval(loadAnnouncements, 60000);

    // Set up real-time subscription
    const channel = supabase.channel('announcements_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'announcements'
        },
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

  // Rotate announcements every 5 seconds if there are multiple
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
    <div className="bg-gradient-to-r from-rose-600 to-rose-700 text-white py-3 shadow-lg relative z-[60]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-3">
          <AlertCircle className="w-5 h-5 text-rose-200 animate-pulse" />
          <p className="text-sm md:text-base font-medium">
            <span className="font-semibold">{currentAnnouncement.doctor?.name}:</span> {currentAnnouncement.message}
          </p>
        </div>
      </div>
    </div>
  );
};