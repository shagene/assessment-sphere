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
          name: string
          subdomain: string
          parent_id: string | null
          type: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          subdomain: string
          parent_id?: string | null
          type: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          subdomain?: string
          parent_id?: string | null
          type?: string
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          encrypted_password: string
          tenant_id: string | null
          role: string
          name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          encrypted_password: string
          tenant_id?: string | null
          role: string
          name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          encrypted_password?: string
          tenant_id?: string | null
          role?: string
          name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      assessments: {
        Row: {
          id: string
          title: string
          description: string | null
          tenant_id: string
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          tenant_id: string
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          tenant_id?: string
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      questions: {
        Row: {
          id: string
          assessment_id: string
          question_text: string
          question_type: string
          options: Json | null
          correct_answer: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          assessment_id: string
          question_text: string
          question_type: string
          options?: Json | null
          correct_answer?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          assessment_id?: string
          question_text?: string
          question_type?: string
          options?: Json | null
          correct_answer?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      assessment_results: {
        Row: {
          id: string
          assessment_id: string
          user_id: string
          score: number | null
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          assessment_id: string
          user_id: string
          score?: number | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          assessment_id?: string
          user_id?: string
          score?: number | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}