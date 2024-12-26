import React, { useEffect } from 'react';
import { X, AlertCircle, CheckCircle } from 'lucide-react';

interface AlertProps {
  type: 'success' | 'error';
  message: string;
  duration?: number;
  onClose: () => void;
}

export const Alert: React.FC<AlertProps> = ({ 
  type, 
  message, 
  duration = 5000,
  onClose 
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const styles = {
    success: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-800',
      icon: <CheckCircle className="w-5 h-5 text-emerald-500" />
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200', 
      text: 'text-red-800',
      icon: <AlertCircle className="w-5 h-5 text-red-500" />
    }
  }[type];

  return (
    <div className={`${styles.bg} ${styles.border} ${styles.text} border rounded-lg shadow-lg p-4 max-w-md animate-fade-in`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {styles.icon}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};