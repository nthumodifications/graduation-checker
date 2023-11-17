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
      users: {
        Row: {
          created_at: string
          email: string
          name_en: string
          name_zh: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          name_en: string
          name_zh: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          name_en?: string
          name_zh?: string
          user_id?: string
        }
        Relationships: []
      }
      waivers: {
        Row: {
          created_at: string
          evidence: string[]
          from_code: string
          from_credits: number
          from_department: string
          from_grade: string
          from_instructor: string
          from_name: string
          id: number
          reason: string
          reviewee: string
          status: Database["public"]["Enums"]["WaiverStatus"]
          to_course_code: string
          updated_on: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          evidence: string[]
          from_code: string
          from_credits: number
          from_department: string
          from_grade: string
          from_instructor: string
          from_name: string
          id?: number
          reason: string
          reviewee: string
          status?: Database["public"]["Enums"]["WaiverStatus"]
          to_course_code: string
          updated_on?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          evidence?: string[]
          from_code?: string
          from_credits?: number
          from_department?: string
          from_grade?: string
          from_instructor?: string
          from_name?: string
          id?: number
          reason?: string
          reviewee?: string
          status?: Database["public"]["Enums"]["WaiverStatus"]
          to_course_code?: string
          updated_on?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "waivers_reviewee_fkey"
            columns: ["reviewee"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "waivers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      WaiverStatus: "PENDING" | "RETURNED" | "REJECTED" | "APPROVED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
