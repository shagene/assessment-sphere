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
      tenants: {
        Row: {
          id: string
          created_at: string
          name: string
          subdomain: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          subdomain: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          subdomain?: string
        }
      }
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          tenant_id: string | null
          role: 'student' | 'teacher' | 'administrator' | 'individual'
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          tenant_id?: string | null
          role?: 'student' | 'teacher' | 'administrator' | 'individual'
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          tenant_id?: string | null
          role?: 'student' | 'teacher' | 'administrator' | 'individual'
        }
      }
    }
  }
}