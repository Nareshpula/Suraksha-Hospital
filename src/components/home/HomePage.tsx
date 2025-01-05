@@ .. @@
 import DoctorsPage from '../doctors/DoctorsPage';
 import HealthTools from '../calculators/HealthTools';
 import LocationSection from '../location/LocationSection';
import AnnouncementBanner from '../announcements/AnnouncementBanner';
+import AvailabilityBanner from './AvailabilityBanner';

 const HomePage = () => {
   const location = useLocation();
@@ .. @@
   return (
     <>
      <AnnouncementBanner />
+      <AvailabilityBanner />
       <Hero />
       <ImageCarousel />
       <div ref={servicesRef}>
@@ .. @@