import { supabase } from '../lib/supabase';

// Constants
const OTP_EXPIRY_MINUTES = 5;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Validation functions
const isValidPhoneNumber = (phone: string): boolean => {
  return /^[6-9]\d{9}$/.test(phone);
};

const isValidOTP = (otp: string): boolean => {
  return /^\d{6}$/.test(otp);
};

// Generate a random 6-digit OTP
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Delete existing OTPs for a phone number
const deleteExistingOTPs = async (phoneNumber: string): Promise<void> => {
  try {
    await supabase
      .from('otp_verifications')
      .delete()
      .eq('phone_number', phoneNumber);
  } catch (err) {
    console.warn('Failed to delete old OTPs:', err);
  }
};

// Create new OTP verification
export const createOTPVerification = async (phoneNumber: string): Promise<boolean> => {
  try {
    if (!isValidPhoneNumber(phoneNumber)) {
      throw new Error('Invalid phone number format');
    }

    // Try to delete existing OTPs but don't block on failure
    try {
      await deleteExistingOTPs(phoneNumber);
    } catch (err) {
      console.warn('Failed to delete old OTPs:', err);
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    let retries = MAX_RETRIES;
    while (retries > 0) {
      const { error } = await supabase
        .from('otp_verifications')
        .insert([{
          phone_number: phoneNumber,
          otp_code: otp,
          expires_at: expiresAt.toISOString(),
          verified: false
        }]);

      if (!error) {
        // For development only - remove in production
        console.log(`OTP for ${phoneNumber}: ${otp}`);
        return true;
      }

      console.warn(`OTP creation attempt ${MAX_RETRIES - retries + 1} failed:`, error);
      retries--;

      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      }
    }

    throw new Error('Failed to create OTP after multiple attempts');
  } catch (err) {
    console.error('Failed to create OTP verification:', err);
    return false;
  }
};

// Verify OTP
export const verifyOTP = async (phoneNumber: string, otp: string): Promise<boolean> => {
  try {
    if (!isValidPhoneNumber(phoneNumber) || !isValidOTP(otp)) {
      return false;
    }

    let retries = MAX_RETRIES;
    while (retries > 0) {
      const { data, error } = await supabase
        .from('otp_verifications')
        .select('id, phone_number, otp_code, expires_at')
        .match({
          phone_number: phoneNumber,
          otp_code: otp,
          verified: false
        })
        .gt('expires_at', new Date().toISOString())
        .single();

      if (!error && data) {
        // Mark OTP as verified
        const { error: updateError } = await supabase
          .from('otp_verifications')
          .update({ verified: true })
          .match({ id: data.id });

        if (!updateError) {
          return true;
        }

        console.warn('Failed to mark OTP as verified:', updateError);
      }

      console.warn(`OTP verification attempt ${MAX_RETRIES - retries + 1} failed:`, error);
      retries--;

      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      }
    }

    return false;
  } catch (err) {
    console.error('Failed to verify OTP:', err);
    return false;
  }
};