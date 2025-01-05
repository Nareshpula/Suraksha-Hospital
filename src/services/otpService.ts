import { supabase } from '../lib/supabase';

// Generate a random 6-digit OTP
export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Create OTP record in database
export const createOTPVerification = async (phoneNumber: string): Promise<boolean> => {
  try {
    await supabase.rpc('manual_cleanup_otps', { p_phone_number: phoneNumber });

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry

    // Create OTP record first
    const { data: otpData, error: otpError } = await supabase
      .from('otp_verifications')
      .insert([{
        phone_number: phoneNumber,
        otp_code: otp,
        expires_at: expiresAt.toISOString(),
        verified: false
      }])
      .select()
      .single();

    if (otpError) {
      console.error('Error creating OTP:', otpError);
      if (otpError.message.includes('Too many OTP attempts')) {
        throw new Error('Please wait before requesting another OTP');
      }
      throw otpError;
    }

    // Send OTP via database function
    const { data: smsResult, error: smsError } = await supabase
      .rpc('send_otp', {
        p_phone_number: phoneNumber,
        p_otp: otpData.otp_code
      });

    if (smsError) {
      console.error('SMS RPC error:', smsError);
      // Clean up OTP record if SMS fails
      await supabase
        .from('otp_verifications')
        .delete()
        .match({ id: otpData.id });
      throw new Error('Failed to send OTP. Please try again.');
    }

    if (!smsResult?.success) {
      console.error('SMS send failed:', smsResult?.message);
      // Clean up OTP record if SMS fails
      await supabase
        .from('otp_verifications')
        .delete()
        .match({ id: otpData.id });
      throw new Error(smsResult?.message || 'Failed to send OTP. Please try again.');
    }

    console.log('SMS sent successfully:', smsResult);

    return true;
  } catch (err) {
    console.error('Failed to create OTP verification:', err);
    throw err;
  } 
};

// Verify OTP
export const verifyOTP = async (phoneNumber: string, otp: string): Promise<boolean> => {
  try {
    if (!phoneNumber || !otp) {
      console.error('Missing phone number or OTP');
      return false;
    }

    // Call the validate_otp RPC function
    const { data, error } = await supabase
      .rpc('validate_otp', {
        p_phone_number: phoneNumber,
        p_otp_code: otp
      });

    if (error) {
      console.error('Error validating OTP:', error);
      return false;
    }

    return data || false;
  } catch (err) {
    console.error('Failed to verify OTP:', err);
    return false;
  }
};