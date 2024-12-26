import { supabase } from '../lib/supabase';

// Generate a random 6-digit OTP
export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Create OTP record in database
export const createOTPVerification = async (phoneNumber: string): Promise<boolean> => {
  try {
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry

    const { error } = await supabase
      .from('otp_verifications')
      .insert([{
        phone_number: phoneNumber,
        otp_code: otp,
        expires_at: expiresAt.toISOString(),
        verified: false
      }]);

    if (error) throw error;

    // In production, integrate with SMS service here
    console.log(`OTP for ${phoneNumber}: ${otp}`);
    return true;
  } catch (err) {
    console.error('Failed to create OTP verification:', err);
    return false;
  }
};

// Verify OTP
export const verifyOTP = async (phoneNumber: string, otp: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('otp_verifications')
      .select()
      .match({
        phone_number: phoneNumber,
        otp_code: otp,
        verified: false
      })
      .gt('expires_at', new Date().toISOString())
      .single();

    if (error || !data) return false;

    // Mark OTP as verified
    await supabase
      .from('otp_verifications')
      .update({ verified: true })
      .match({ id: data.id, verified: false });

    return true;
  } catch (err) {
    console.error('Failed to verify OTP:', err);
    return false;
  }
};