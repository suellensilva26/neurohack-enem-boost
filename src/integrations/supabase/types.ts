export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      chapters: {
        Row: {
          created_at: string | null
          ebook_id: string | null
          id: string
          ord: number
          title: string
        }
        Insert: {
          created_at?: string | null
          ebook_id?: string | null
          id: string
          ord: number
          title: string
        }
        Update: {
          created_at?: string | null
          ebook_id?: string | null
          id?: string
          ord?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "chapters_ebook_id_fkey"
            columns: ["ebook_id"]
            isOneToOne: false
            referencedRelation: "ebooks"
            referencedColumns: ["id"]
          },
        ]
      }
      checklist_progress: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          id: string
          subject: string
          topic_id: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          subject: string
          topic_id: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          subject?: string
          topic_id?: string
          user_id?: string
        }
        Relationships: []
      }
      chunks: {
        Row: {
          created_at: string | null
          id: string
          lesson_id: string | null
          page_range: string | null
          tags: string[] | null
          text: string
        }
        Insert: {
          created_at?: string | null
          id: string
          lesson_id?: string | null
          page_range?: string | null
          tags?: string[] | null
          text: string
        }
        Update: {
          created_at?: string | null
          id?: string
          lesson_id?: string | null
          page_range?: string | null
          tags?: string[] | null
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "chunks_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      conversion_triggers: {
        Row: {
          clicked: boolean | null
          created_at: string | null
          id: string
          shown_at: string | null
          trigger_type: string
          user_id: string
        }
        Insert: {
          clicked?: boolean | null
          created_at?: string | null
          id?: string
          shown_at?: string | null
          trigger_type: string
          user_id: string
        }
        Update: {
          clicked?: boolean | null
          created_at?: string | null
          id?: string
          shown_at?: string | null
          trigger_type?: string
          user_id?: string
        }
        Relationships: []
      }
      daily_usage: {
        Row: {
          created_at: string | null
          date: string
          id: string
          last_activity_at: string | null
          questions_answered: number | null
          streak_days: number | null
          study_hours: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          date?: string
          id?: string
          last_activity_at?: string | null
          questions_answered?: number | null
          streak_days?: number | null
          study_hours?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          last_activity_at?: string | null
          questions_answered?: number | null
          streak_days?: number | null
          study_hours?: number | null
          user_id?: string
        }
        Relationships: []
      }
      dual_coding_content: {
        Row: {
          content: Json
          created_at: string | null
          id: string
          image_url: string | null
          subject: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          content: Json
          created_at?: string | null
          id?: string
          image_url?: string | null
          subject?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          content?: Json
          created_at?: string | null
          id?: string
          image_url?: string | null
          subject?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      ebooks: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          premium: boolean | null
          price: number | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id: string
          premium?: boolean | null
          price?: number | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          premium?: boolean | null
          price?: number | null
          title?: string
        }
        Relationships: []
      }
      error_tracking: {
        Row: {
          created_at: string | null
          error_type: string
          frequency: number | null
          id: string
          strategy: string | null
          subject: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          error_type: string
          frequency?: number | null
          id?: string
          strategy?: string | null
          subject: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          error_type?: string
          frequency?: number | null
          id?: string
          strategy?: string | null
          subject?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      feynman_recordings: {
        Row: {
          audio_url: string | null
          created_at: string | null
          duration_seconds: number | null
          engagements: Json | null
          id: string
          transcript: string | null
          user_id: string
        }
        Insert: {
          audio_url?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          engagements?: Json | null
          id?: string
          transcript?: string | null
          user_id: string
        }
        Update: {
          audio_url?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          engagements?: Json | null
          id?: string
          transcript?: string | null
          user_id?: string
        }
        Relationships: []
      }
      flashcards: {
        Row: {
          answer: string
          chunk_id: string | null
          created_at: string | null
          id: string
          question: string
        }
        Insert: {
          answer: string
          chunk_id?: string | null
          created_at?: string | null
          id: string
          question: string
        }
        Update: {
          answer?: string
          chunk_id?: string | null
          created_at?: string | null
          id?: string
          question?: string
        }
        Relationships: [
          {
            foreignKeyName: "flashcards_chunk_id_fkey"
            columns: ["chunk_id"]
            isOneToOne: false
            referencedRelation: "chunks"
            referencedColumns: ["id"]
          },
        ]
      }
      free_flashcard_progress: {
        Row: {
          created_at: string | null
          flashcard_id: string
          id: string
          reviewed_at: string | null
          status: string
          subject: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          flashcard_id: string
          id?: string
          reviewed_at?: string | null
          status?: string
          subject: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          flashcard_id?: string
          id?: string
          reviewed_at?: string | null
          status?: string
          subject?: string
          user_id?: string
        }
        Relationships: []
      }
      generated_content: {
        Row: {
          content: string
          created_at: string | null
          id: string
          metadata: Json | null
          type: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          type: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      lessons: {
        Row: {
          chapter_id: string | null
          content: string | null
          created_at: string | null
          est_read_min: number | null
          id: string
          ord: number
          title: string
          video_short_url: string | null
          video_url: string | null
        }
        Insert: {
          chapter_id?: string | null
          content?: string | null
          created_at?: string | null
          est_read_min?: number | null
          id: string
          ord: number
          title: string
          video_short_url?: string | null
          video_url?: string | null
        }
        Update: {
          chapter_id?: string | null
          content?: string | null
          created_at?: string | null
          est_read_min?: number | null
          id?: string
          ord?: number
          title?: string
          video_short_url?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      neuro_prep_sessions: {
        Row: {
          completed_at: string | null
          created_at: string | null
          duration_seconds: number
          id: string
          objective: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          duration_seconds: number
          id?: string
          objective: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          duration_seconds?: number
          id?: string
          objective?: string
          user_id?: string
        }
        Relationships: []
      }
      pattern_insights: {
        Row: {
          content: string
          created_at: string | null
          id: string
          insight_type: string
          pattern_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          insight_type: string
          pattern_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          insight_type?: string
          pattern_id?: string
          user_id?: string
        }
        Relationships: []
      }
      pattern_progress: {
        Row: {
          completed: boolean | null
          created_at: string | null
          exercises_completed: number | null
          id: string
          last_studied_at: string | null
          module: string
          notes: string | null
          pattern_id: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          exercises_completed?: number | null
          id?: string
          last_studied_at?: string | null
          module: string
          notes?: string | null
          pattern_id: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          exercises_completed?: number | null
          id?: string
          last_studied_at?: string | null
          module?: string
          notes?: string | null
          pattern_id?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          desired_course: string | null
          entitlements: string[] | null
          full_name: string | null
          id: string
          main_difficulty: string | null
          onboarding_completed: boolean | null
          phone: string | null
          preparation_level: string | null
          study_days_available: number | null
          target_university: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          desired_course?: string | null
          entitlements?: string[] | null
          full_name?: string | null
          id: string
          main_difficulty?: string | null
          onboarding_completed?: boolean | null
          phone?: string | null
          preparation_level?: string | null
          study_days_available?: number | null
          target_university?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          desired_course?: string | null
          entitlements?: string[] | null
          full_name?: string | null
          id?: string
          main_difficulty?: string | null
          onboarding_completed?: boolean | null
          phone?: string | null
          preparation_level?: string | null
          study_days_available?: number | null
          target_university?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      protocol_sessions: {
        Row: {
          completed_at: string | null
          created_at: string | null
          efficiency_score: number | null
          id: string
          notes: string | null
          phases_completed: Json
          total_duration_seconds: number
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          efficiency_score?: number | null
          id?: string
          notes?: string | null
          phases_completed: Json
          total_duration_seconds: number
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          efficiency_score?: number | null
          id?: string
          notes?: string | null
          phases_completed?: Json
          total_duration_seconds?: number
          user_id?: string
        }
        Relationships: []
      }
      purchases: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          id: string
          product_id: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          id: string
          product_id: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          id?: string
          product_id?: string
          user_id?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          alternatives: Json
          chunk_id: string | null
          correct_index: number
          created_at: string | null
          difficulty: string | null
          explanation: string | null
          id: string
          priority: boolean | null
          prompt: string
          qtype: string
          tags: string[] | null
        }
        Insert: {
          alternatives: Json
          chunk_id?: string | null
          correct_index: number
          created_at?: string | null
          difficulty?: string | null
          explanation?: string | null
          id: string
          priority?: boolean | null
          prompt: string
          qtype: string
          tags?: string[] | null
        }
        Update: {
          alternatives?: Json
          chunk_id?: string | null
          correct_index?: number
          created_at?: string | null
          difficulty?: string | null
          explanation?: string | null
          id?: string
          priority?: boolean | null
          prompt?: string
          qtype?: string
          tags?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_chunk_id_fkey"
            columns: ["chunk_id"]
            isOneToOne: false
            referencedRelation: "chunks"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_results: {
        Row: {
          created_at: string | null
          id: string
          lesson_id: string | null
          score: number
          time_spent_seconds: number | null
          total_questions: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          lesson_id?: string | null
          score: number
          time_spent_seconds?: number | null
          total_questions: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          lesson_id?: string | null
          score?: number
          time_spent_seconds?: number | null
          total_questions?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_results_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      study_sessions: {
        Row: {
          activities: Json | null
          created_at: string | null
          id: string
          session_date: string | null
          user_id: string
        }
        Insert: {
          activities?: Json | null
          created_at?: string | null
          id?: string
          session_date?: string | null
          user_id: string
        }
        Update: {
          activities?: Json | null
          created_at?: string | null
          id?: string
          session_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_entitlements: {
        Row: {
          entitlement: string
          granted_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          entitlement: string
          granted_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          entitlement?: string
          granted_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_flashcards: {
        Row: {
          answer: string
          created_at: string | null
          id: string
          next_review_at: string | null
          question: string
          review_count: number | null
          source: string | null
          tags: string[] | null
          user_id: string
        }
        Insert: {
          answer: string
          created_at?: string | null
          id?: string
          next_review_at?: string | null
          question: string
          review_count?: number | null
          source?: string | null
          tags?: string[] | null
          user_id: string
        }
        Update: {
          answer?: string
          created_at?: string | null
          id?: string
          next_review_at?: string | null
          question?: string
          review_count?: number | null
          source?: string | null
          tags?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          id: string
          lesson_id: string | null
          percent: number | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          id: string
          lesson_id?: string | null
          percent?: number | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          id?: string
          lesson_id?: string | null
          percent?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_user_streak: {
        Args: { p_user_id: string }
        Returns: number
      }
      has_entitlement: {
        Args: { _entitlement: string; _user_id: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "free_user" | "full_access" | "premium_user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "free_user", "full_access", "premium_user"],
    },
  },
} as const
