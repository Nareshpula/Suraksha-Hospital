import React from 'react';
import { Video, Calendar, Clock, CreditCard, CheckCircle, ArrowLeft, MessageCircle, Stethoscope, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OnlineConsultationPage = () => {
  const navigate = useNavigate();

  const consultationTypes = [
    {
      icon: Video,
      title: "Video Consultation",
      description: "Face-to-face virtual consultation with our specialists",
      duration: "30 mins",
      price: "₹500",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
    },
    {
      icon: MessageCircle,
      title: "Chat Consultation",
      description: "Text-based consultation for quick medical advice",
      duration: "24 hours",
      price: "₹300",
      image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const specialties = [
    {
      name: "Obstetrics & Gynecology",
      doctor: "Dr. C. Prashanthi",
      qualification: "M.B.B.S, MS, OBG",
      available: "Mon-Sat, 10:00 AM - 6:00 PM",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Orthopedics",
      doctor: "Dr. K. Sai Krishna Reddy",
      qualification: "M.B.B.S., M.S Ortho, FIJR",
      available: "Mon-Sat, 9:00 AM - 5:00 PM",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50 pt-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-rose-500 to-pink-600 text-white py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate('/')}
            className="group flex items-center text-white/90 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </button>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                Online Consultation
              </h1>
              <p className="text-xl text-rose-100 mb-8 animate-fade-in-delayed">
                Connect with our specialists from the comfort of your home. 
                Get expert medical advice through secure video consultations.
              </p>
              <div className="space-y-4">
                {[
                  "Convenient and secure consultations",
                  "Expert medical advice from specialists",
                  "Digital prescriptions and follow-ups",
                  "Flexible scheduling options"
                ].map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-2 opacity-0 animate-fade-in"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <CheckCircle className="w-5 h-5 text-rose-200" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070"
                alt="Online Consultation"
                className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Consultation Types */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Choose Your Consultation Type
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {consultationTypes.map((type, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
              >
                <div className="absolute inset-0">
                  <img 
                    src={type.image} 
                    alt={type.title}
                    className="w-full h-full object-cover opacity-10 transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="relative p-8">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-rose-100 rounded-lg group-hover:bg-rose-200 transition-colors">
                      <type.icon className="w-8 h-8 text-rose-600 animate-pulse" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-900">{type.title}</h3>
                      <p className="text-gray-500">{type.description}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-t pt-4">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-2" />
                      {type.duration}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <CreditCard className="w-5 h-5 mr-2" />
                      {type.price}
                    </div>
                  </div>
                  <button 
                    className="mt-6 w-full bg-rose-600 text-white py-3 rounded-lg group-hover:bg-rose-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Available Specialists */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Specialists
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {specialties.map((specialty, index) => (
              <div 
                key={index}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
              >
                <div className="relative h-48">
                  <img
                    src={specialty.image}
                    alt={specialty.doctor}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-semibold">{specialty.name}</h3>
                    <p className="text-rose-200">{specialty.doctor}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{specialty.qualification}</p>
                  <div className="flex items-center text-gray-600 mb-6">
                    <Calendar className="w-5 h-5 mr-2 text-rose-500" />
                    <span>{specialty.available}</span>
                  </div>
                  <button 
                    className="w-full bg-rose-600 text-white py-3 rounded-lg hover:bg-rose-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                    onClick={() => console.log(`Book consultation with ${specialty.doctor}`)}
                  >
                    <span>Book Consultation</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default OnlineConsultationPage;