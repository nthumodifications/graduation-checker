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
      overrides: {
        Row: {
          action: string
          data: Json | null
          id: number
          name: string
          target: string
          target_id: string
          user_id: string
        }
        Insert: {
          action: string
          data?: Json | null
          id?: number
          name: string
          target: string
          target_id: string
          user_id: string
        }
        Update: {
          action?: string
          data?: Json | null
          id?: number
          name?: string
          target?: string
          target_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "overrides_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          }
        ]
      }
      taken_courses: {
        Row: {
          courses: string[]
          updated_at: string
          user_id: string
        }
        Insert: {
          courses?: string[]
          updated_at?: string
          user_id: string
        }
        Update: {
          courses?: string[]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          name_en: string
          name_zh: string
          role: Database["public"]["Enums"]["Role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          name_en: string
          name_zh: string
          role?: Database["public"]["Enums"]["Role"]
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          name_en?: string
          name_zh?: string
          role?: Database["public"]["Enums"]["Role"]
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
      Role: "student" | "teacher"
      WaiverStatus: "PENDING" | "RETURNED" | "REJECTED" | "APPROVED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
