import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "What types of general health conditions do you treat?",
    answer: "We treat a wide range of conditions including fevers, infections, respiratory issues, digestive problems, and chronic diseases like diabetes and hypertension."
  },
  {
    question: "How often should I schedule health check-ups?",
    answer: "We recommend annual health check-ups for adults. However, the frequency may vary based on age, existing health conditions, and risk factors."
  },
  {
    question: "Do you provide diabetic care and management?",
    answer: "Yes, Dr. Bysani Naveen Kumar specializes in diabetology and provides comprehensive diabetes management including blood sugar monitoring, medication adjustment, and lifestyle counseling."
  }
];

const FAQSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <HelpCircle className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;