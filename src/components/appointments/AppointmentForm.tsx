import React from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, User, Phone, MessageSquare, ArrowLeft } from 'lucide-react';
import { doctors } from '../../data/doctors';
import { formatWhatsAppMessage } from '../../utils/messageFormatter';

interface AppointmentFormData {
  name: string;
  phone: string;
  date: string;
  comments?: string;
}

interface AppointmentFormProps {
  doctorId: string;
  onBack: () => void;
  onClose: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ doctorId, onBack, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<AppointmentFormData>();
  const selectedDoctor = doctors.find(d => d.id === doctorId);

  const onSubmit = async (data: AppointmentFormData) => {
    try {
      const message = formatWhatsAppMessage({
        ...data,
        doctor: selectedDoctor?.name || ''
      });
      const whatsappUrl = `https://wa.me/918095626360?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      onClose();
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send appointment request. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Doctor Selection
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Book Appointment with {selectedDoctor?.name}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                {...register('name', { 
                  required: 'Name is required',
                  minLength: { value: 3, message: 'Name must be at least 3 characters' }
                })}
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                placeholder="Enter your full name"
              />
            </div>
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: 'Please enter a valid 10-digit Indian phone number'
                  }
                })}
                type="tel"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                placeholder="Enter your phone number"
              />
            </div>
            {errors.phone && (
              <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Preferred Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                {...register('date', { required: 'Please select a date' })}
                type="date"
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              />
            </div>
            {errors.date && (
              <p className="text-sm text-red-600 mt-1">{errors.date.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Additional Comments (Optional)
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
              <textarea
                {...register('comments')}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 min-h-[100px]"
                placeholder="Any specific concerns or requirements..."
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-rose-600 text-white py-3 rounded-lg hover:bg-rose-700 transition-colors duration-300"
            >
              Book via WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;