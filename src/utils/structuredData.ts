import { Doctor } from '../types/doctor';

export const generateHospitalSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Hospital",
  "name": "Bysani Suraksha Speciality Hospital",
  "image": "https://www.surakshahospitalmadanapalle.com/og-image.jpg",
  "url": "https://www.surakshahospitalmadanapalle.com",
  "telephone": "+9196666426748",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "#2/259, Society Colony",
    "addressLocality": "Madanapalle",
    "addressRegion": "Andhra Pradesh",
    "postalCode": "517325",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 13.56001591285874,
    "longitude": 78.49727554764979
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "10:00",
      "closes": "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "10:00",
      "closes": "14:00"
    }
  ],
  "department": [
    {
      "@type": "MedicalSpecialty",
      "name": "General Medicine",
      "description": "Expert care in General Medicine, Physician & Diabetologist services"
    },
    {
      "@type": "MedicalSpecialty",
      "name": "Pediatrics",
      "description": "Specialized pediatric care including NICU facilities"
    }
  ],
  "availableService": [
    {
      "@type": "MedicalTest",
      "name": "Laboratory Services",
      "description": "Comprehensive diagnostic testing services"
    },
    {
      "@type": "MedicalTherapy",
      "name": "Emergency Services",
      "description": "24/7 NICU emergency care"
    }
  ]
});

export const generateDoctorSchema = (doctor: Doctor) => ({
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": doctor.name,
  "image": doctor.image,
  "medicalSpecialty": doctor.specialty,
  "qualification": doctor.qualification,
  "worksFor": {
    "@type": "Hospital",
    "name": "Bysani Suraksha Speciality Hospital"
  }
});

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://www.surakshahospitalmadanapalle.com${item.url}`
  }))
});