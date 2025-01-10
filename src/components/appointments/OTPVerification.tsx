import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { verifyOTP } from '../../services/otpService';
import { Alert } from '../common/Alert';

interface OTPVerificationProps {
  phoneNumber: string;
  onVerified: () => void;
  onBack: () => void;
}

export const OTPVerification: React.FC<OTPVerificationProps> = ({ 
  phoneNumber, 
  onVerified,
  onBack 
}) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (!canResend && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setError('');

    try {
      if (!/^\d{6}$/.test(otp)) {
        throw new Error('Please enter a valid 6-digit OTP');
      }

      console.log('Verifying OTP:', { phoneNumber, otp });
      const isVerified = await verifyOTP(phoneNumber.trim(), otp.trim());
      console.log('OTP verification result:', isVerified);

      if (!isVerified) {
        throw new Error('Invalid OTP code. Please try again or request a new one.');
      }

      onVerified();
    } catch (err) {
      console.error('OTP verification error:', err);
      setError(err instanceof Error ? err.message : 'Failed to verify OTP. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <button 
        onClick={onBack}
        className="group flex items-center text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
        Back
      </button>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Verify Your Phone Number
      </h2>

      <p className="text-gray-600 mb-8">
        We've sent a verification code to {phoneNumber}
      </p>

      {error && (
        <Alert
          type="error"
          message={error}
          onClose={() => setError('')}
        />
      )}

      <form onSubmit={handleVerify} className="space-y-6">
        <div>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="Enter 6-digit OTP"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            maxLength={6}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isVerifying || otp.length !== 6}
          className="w-full bg-rose-600 text-white py-3 rounded-lg hover:bg-rose-700 transition-colors disabled:opacity-50"
        >
          {isVerifying ? 'Verifying...' : 'Verify OTP'}
        </button>

        <div className="text-center text-gray-500">
          {canResend ? (
            <button
              type="button"
              onClick={onBack}
              className="text-rose-600 hover:text-rose-700"
            >
              Resend OTP
            </button>
          ) : (
            <p>Resend OTP in {countdown}s</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default OTPVerification;