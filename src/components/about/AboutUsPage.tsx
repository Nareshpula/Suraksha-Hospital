import React from 'react';
import { Shield, Award, Users, Heart, Clock, MapPin, Phone, Mail, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TranslatedText from '../language/TranslatedText';

const AboutUsPage = () => {
  const navigate = useNavigate();

  const milestones = [
    {
      year: "2020",
      titleKey: "Establishment",
      description: "Founded Bysani Suraksha Speciality Hospital with a vision to provide comprehensive healthcare services"
    },
    {
      year: "2021",
      titleKey: "NICU Facility",
      description: "Launched state-of-the-art NICU facility for advanced neonatal care"
    },
    {
      year: "2022",
      titleKey: "Laboratory Services",
      description: "Expanded services with modern diagnostic laboratory facilities"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Patient-Centric Care",
      description: "Putting patients first with compassionate and personalized healthcare services"
    },
    {
      icon: Shield,
      title: "Medical Excellence",
      description: "Maintaining highest standards of medical care with expert professionals"
    },
    {
      icon: Users,
      title: "Community Health",
      description: "Committed to improving community health through accessible healthcare"
    }
  ];

  const vision = "To be the leading healthcare provider in Rayachoty, delivering exceptional medical services with a focus on General Medicine, Physician, Diabetologist and Pediatric care.";

  const mission = "To provide comprehensive, high-quality healthcare services that improve the health and well-being of our community through expert medical care, advanced technology, and compassionate service.";

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-pink-50 pt-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-rose-500 to-pink-600 text-white py-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=2070"
            alt="About Us"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-900/50 to-pink-900/50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate('/')}
            className="group flex items-center text-white/90 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </button>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            About Bysani Suraksha Speciality Hospital
          </h1>
          <p className="text-xl text-rose-100 mb-8 max-w-3xl animate-fade-in-delayed">
            A leading healthcare institution in the Madanapalle and we committed to providing exceptional medical care with specialized focus on General Medicine, Physician, Diabetologist and Pediatric services.
          </p>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision & Mission</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-rose-600 mb-4">Vision</h3>
              <p className="text-gray-600">{vision}</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-pink-600 mb-4">Mission</h3>
              <p className="text-gray-600">{mission}</p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-rose-100 rounded-lg">
                    <value.icon className="w-6 h-6 text-rose-600" />
                  </div>
                  <h3 className="text-xl font-semibold ml-4">{value.title}</h3>
                </div>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Journey</h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className="flex items-start space-x-8 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex-shrink-0 w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-rose-600">{milestone.year}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.titleKey}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;