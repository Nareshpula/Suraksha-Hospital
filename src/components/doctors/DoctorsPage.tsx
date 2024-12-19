import React from 'react';
import DoctorCard from './DoctorCard';

const doctors = [
  {
    name: "Dr. N.SWAPNA",
    specialty: "Paediatrics Specialist",
    experience: "Senior Consultant",
    education: "M.B.B.S, MD, IAP-Fellowship in Neonatology (Fernandez Hospital, Hyderabad)",
    registrationNo: "51947",
    image: "https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg",
    rating: 5,
    contact: {
      email: "dr.n.swapna@gmail.com",
      phone: "+91 9666426748"
    }
  },
  {
    name: "Dr.Bysani NAVEEN KUMAR",
    specialty: "General Medicine, Physician&Diabetologist",
    experience: "Senior Consultant",
    education: "M.B.B.S., M.D General Medicine, Physician and Diabetologist",
    registrationNo: "51946",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800",
    rating: 5,
    contact: {
      email: "dr.bysaninaveenkumar@gmail.com",
      phone: "+91 9666426748"
    }
  }
];

const DoctorsPage = () => {
  return (
    <section id="doctors" className="py-24 bg-gradient-to-b from-pink-50 to-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Expert Doctors</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet our team of experienced specialists dedicated to providing exceptional healthcare
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <DoctorCard {...doctor} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsPage;