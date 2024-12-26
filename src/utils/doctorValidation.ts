import { supabase } from '../lib/supabase';
import { doctors as localDoctors } from '../data/doctors';

// Normalize UUID to lowercase for consistent comparison
export const normalizeUUID = (uuid: string): string => {
  if (!uuid) return '';
  return uuid.toLowerCase().replace(/[^a-f0-9-]/g, '');
};

// Validate UUID format
export const isValidUUID = (uuid: string): boolean => {
  if (!uuid) return false;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

// Verify doctor exists with retry logic
export const verifyDoctorExists = async (doctorId: string): Promise<boolean> => {
  if (!isValidUUID(doctorId)) {
    return false;
  }

  const normalizedId = normalizeUUID(doctorId);

  // First check local data
  const localDoctor = localDoctors.find(d => normalizeUUID(d.id) === normalizedId);
  if (localDoctor) {
    return true;
  }

  try {
    const { count, error } = await supabase
      .from('doctors')
      .select('id', { count: 'exact', head: true })
      .eq('id', normalizedId);
    
    if (error) throw error;
    return count === 1;
  } catch (err) {
    console.error('Failed to verify doctor:', err);
    return false;
  }
};