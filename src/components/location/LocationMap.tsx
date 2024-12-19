import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

// Exact coordinates for Bysani Suraksha Speciality Hospital
const HOSPITAL_LOCATION = {
  lat: 13.56001591285874,
  lng: 78.49727554764979
};

const LocationMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: 'AIzaSyDOCvUZMfAttYhSMtnZxcYR5i3Iky-a5XI',
        version: 'weekly'
      });

      try {
        const google = await loader.load();
        if (!mapRef.current) return;

        const map = new google.maps.Map(mapRef.current, {
          center: HOSPITAL_LOCATION,
          zoom: 17,
          mapTypeControl: true,
          fullscreenControl: true,
          streetViewControl: true,
          zoomControl: true,
          styles: [
            {
              featureType: 'poi.business',
              stylers: [{ visibility: 'simplified' }]
            }
          ]
        });

        // Add marker for hospital location
        const marker = new google.maps.Marker({
          position: HOSPITAL_LOCATION,
          map,
          title: 'Bysani Suraksha Speciality Hospital',
          animation: google.maps.Animation.DROP
        });

        // Create info window with hospital details
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 16px; max-width: 300px;">
              <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">
                Bysani Suraksha Speciality Hospital
              </h3>
              <p style="color: #666; margin-bottom: 8px;">
                Door No.: 2, 259<br>
                Society Colony Main Rd<br>
                Kuravanka, Society Colony<br>
                Madanapalle-517325<br>
                Andhra Pradesh
              </p>
              <div style="color: #666; font-size: 14px;">
                <p style="margin-bottom: 4px;">Reception: 08571-220345</p>
                <p style="margin-bottom: 4px;">Mobile: 96666426748</p>
                <p>Emergency: 24/7</p>
              </div>
            </div>
          `
        });

        // Show info window on marker click
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        // Initially open the info window
        infoWindow.open(map, marker);

      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initMap();
  }, []);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full min-h-[400px]"
      aria-label="Map showing hospital location"
    />
  );
};

export default LocationMap;