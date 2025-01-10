import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Stethoscope, Baby, TestTube, Siren, Pill, 
  Calendar, Scale, Syringe, MapPin, Phone, 
  Mail, Clock, ArrowRight, Award, Star,
  Shield, Heart, Activity, Facebook, Instagram,
  Twitter, Youtube
} from 'lucide-react';

const LastPage = () => {
  const navigate = useNavigate();

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/bysanisuraksha', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/bysanisuraksha', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/bysanisuraksha', label: 'Twitter' },
    { icon: Youtube, href: 'https://youtube.com/bysanisuraksha', label: 'Youtube' }
  ];

  const highlights = [
    {
      icon: Heart,
      title: "Expert Care",
      description: "Specialized medical services with experienced healthcare professionals"
    },
    {
      icon: Shield,
      title: "24/7 Emergency-NICU",
      description: "Round-the-clock emergency medical services and NICU facility"
    },
    {
      icon: Activity,
      title: "Modern Facilities",
      description: "State-of-the-art medical equipment and infrastructure"
    },
    {
      icon: Star,
      title: "Patient-Centric",
      description: "Personalized care approach focusing on patient comfort"
    }
  ];

  const services = [
    {
      icon: Stethoscope,
      title: 'General Healthcare',
      description: 'Expert medical care with specialized focus on General Medicine, Physician & Diabetologist services.',
      features: ['Comprehensive health check-ups', 'Chronic disease management', 'Preventive care'],
      path: '/services/general-healthcare'
    },
    {
      icon: Baby,
      title: 'Paediatrics',
      description: 'Comprehensive pediatric care led by Dr. N. Swapna.',
      features: ['Newborn care', 'Growth monitoring', 'Vaccination services'],
      path: '/services/paediatrics'
    },
    {
      icon: TestTube,
      title: 'Laboratory Services',
      description: 'Advanced diagnostic testing with state-of-the-art equipment.',
      features: ['Quick results', 'Wide range of tests', '7 AM to 11 PM service'],
      path: '/services/laboratory'
    }
  ];

  const healthTools = [
    {
      icon: Calendar,
      title: 'Due Date Calculator',
      description: 'Calculate your expected delivery date and track pregnancy milestones.',
      path: '/calculators/due-date',
      gradient: 'from-pink-600'
    },
    {
      icon: Scale,
      title: 'BMI Calculator',
      description: 'Calculate and monitor your Body Mass Index for better health tracking.',
      path: '/calculators/bmi',
      gradient: 'from-emerald-600'
    },
    {
      icon: Syringe,
      title: 'Vaccination Schedule',
      description: 'Track your child\'s immunization schedule and upcoming vaccinations.',
      path: '/calculators/vaccination',
      gradient: 'from-blue-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 pt-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-24">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&q=80&w=2070"
            alt="Hospital Overview"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-gray-800/50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 animate-fade-in">
            Bysani Suraksha Speciality Hospital
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 animate-fade-in-delayed">
            Your trusted healthcare partner, providing comprehensive medical services with expertise and compassion
          </p>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transform hover:scale-110 transition-all duration-300"
              >
                <link.icon className="w-6 h-6" />
              </a>
            ))}
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
            {highlights.map((highlight, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <highlight.icon className="w-8 h-8 text-white mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2">{highlight.title}</h3>
                <p className="text-sm text-gray-300">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Services Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive healthcare services delivered by our expert team of doctors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => navigate(service.path)}
                className="group bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <service.icon className="w-8 h-8 text-gray-600" />
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-500">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Health Tools Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Health Tools</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Access our suite of healthcare calculators and tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {healthTools.map((tool, index) => (
              <div
                key={index}
                onClick={() => navigate(tool.path)}
                className={`group cursor-pointer bg-gradient-to-br ${tool.gradient} to-transparent text-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
              >
                <tool.icon className="w-8 h-8 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                <p className="text-white/90">{tool.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get in touch with us for appointments or inquiries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <MapPin className="w-8 h-8 text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Location</h3>
              <p className="text-gray-600">
                516269, Opposite Water Tank,<br />
                Near Check Post, S.N Colony,<br />
                Rayachoty, Andhra Pradesh
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <Phone className="w-8 h-8 text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Contact</h3>
              <p className="text-gray-600 space-y-1">
                Reception: 08571-220345<br />
                Mobile: 96666426748<br />
                Emergency: 24/7<br />
                Email: info@surakshahospitalmadanapalle.com
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <Clock className="w-8 h-8 text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Working Hours</h3>
              <p className="text-gray-600">
                Emergency: 24/7<br />
                OPD: 9:00 AM - 8:00 PM<br />
                Lab: 7:00 AM - 11:00 PM
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LastPage;