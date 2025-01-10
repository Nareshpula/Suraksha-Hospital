export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      doctors: {
        Row: {
          id: string
          name: string
          specialty: string
          qualification: string
          experience: string | null
          availability: Json | null
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          specialty: string
          qualification: string
          experience?: string | null
          availability?: Json | null
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          specialty?: string
          qualification?: string
          experience?: string | null
          availability?: Json | null
          image_url?: string | null
          created_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          doctor_id: string
          patient_name: string
          phone_number: string
          appointment_date: string
          appointment_time: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          doctor_id: string
          patient_name: string
          phone_number: string
          appointment_date: string
          appointment_time: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          doctor_id?: string
          patient_name?: string
          phone_number?: string
          appointment_date?: string
          appointment_time?: string
          status?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}