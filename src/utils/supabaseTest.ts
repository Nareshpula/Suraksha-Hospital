import { supabase } from '../lib/supabase';

export const testSupabaseConnection = async () => {
  console.log('Testing Supabase connection...');

  try {
    const { data, error } = await supabase
      .from('staff_users')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Supabase connection error:', error);
      return { success: false, error };
    }

    console.log('Supabase connection successful');
    return { success: true, data };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, error: err };
  }
};