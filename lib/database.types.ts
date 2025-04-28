export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      analytics: {
        Row: {
          id: string
          created_at: string
          organization_id: string
          page_views: number
          clicks: number
          impressions: number
          date: string
          article_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          organization_id: string
          page_views: number
          clicks: number
          impressions: number
          date: string
          article_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          organization_id?: string
          page_views?: number
          clicks?: number
          impressions?: number
          date?: string
          article_id?: string | null
        }
      }
      article_keywords: {
        Row: {
          id: string
          article_id: string
          keyword_id: string
          created_at: string
        }
        Insert: {
          id?: string
          article_id: string
          keyword_id: string
          created_at?: string
        }
        Update: {
          id?: string
          article_id?: string
          keyword_id?: string
          created_at?: string
        }
      }
      articles: {
        Row: {
          id: string
          title: string
          content: string
          created_at: string
          updated_at: string
          organization_id: string
          status: string
          meta_description: string
          slug: string
          language_id: string
          published_at: string | null
          word_count: number
          content_plan_id: string | null
          author_id: string | null
          featured_image: string | null
        }
        Insert: {
          id?: string
          title: string
          content: string
          created_at?: string
          updated_at?: string
          organization_id: string
          status?: string
          meta_description?: string
          slug: string
          language_id: string
          published_at?: string | null
          word_count?: number
          content_plan_id?: string | null
          author_id?: string | null
          featured_image?: string | null
        }
        Update: {
          id?: string
          title?: string
          content?: string
          created_at?: string
          updated_at?: string
          organization_id?: string
          status?: string
          meta_description?: string
          slug?: string
          language_id?: string
          published_at?: string | null
          word_count?: number
          content_plan_id?: string | null
          author_id?: string | null
          featured_image?: string | null
        }
      }
      cms_connections: {
        Row: {
          id: string
          organization_id: string
          created_at: string
          updated_at: string
          type: string
          credentials: Json
          site_url: string
          status: string
          name: string
        }
        Insert: {
          id?: string
          organization_id: string
          created_at?: string
          updated_at?: string
          type: string
          credentials: Json
          site_url: string
          status?: string
          name: string
        }
        Update: {
          id?: string
          organization_id?: string
          created_at?: string
          updated_at?: string
          type?: string
          credentials?: Json
          site_url?: string
          status?: string
          name?: string
        }
      }
      competitors: {
        Row: {
          id: string
          organization_id: string
          url: string
          created_at: string
          name: string | null
        }
        Insert: {
          id?: string
          organization_id: string
          url: string
          created_at?: string
          name?: string | null
        }
        Update: {
          id?: string
          organization_id?: string
          url?: string
          created_at?: string
          name?: string | null
        }
      }
      content_plan_languages: {
        Row: {
          id: string
          content_plan_id: string
          language_id: string
          created_at: string
        }
        Insert: {
          id?: string
          content_plan_id: string
          language_id: string
          created_at?: string
        }
        Update: {
          id?: string
          content_plan_id?: string
          language_id?: string
          created_at?: string
        }
      }
      content_plans: {
        Row: {
          id: string
          name: string
          description: string
          created_at: string
          updated_at: string
          organization_id: string
          status: string
          target_keywords: string[]
        }
        Insert: {
          id?: string
          name: string
          description: string
          created_at?: string
          updated_at?: string
          organization_id: string
          status?: string
          target_keywords?: string[]
        }
        Update: {
          id?: string
          name?: string
          description?: string
          created_at?: string
          updated_at?: string
          organization_id?: string
          status?: string
          target_keywords?: string[]
        }
      }
      integrations: {
        Row: {
          id: string
          organization_id: string
          type: string
          credentials: Json
          created_at: string
          updated_at: string
          status: string
        }
        Insert: {
          id?: string
          organization_id: string
          type: string
          credentials: Json
          created_at?: string
          updated_at?: string
          status?: string
        }
        Update: {
          id?: string
          organization_id?: string
          type?: string
          credentials?: Json
          created_at?: string
          updated_at?: string
          status?: string
        }
      }
      invitations: {
        Row: {
          id: string
          organization_id: string
          email: string
          role: string
          created_at: string
          expires_at: string
          token: string
          status: string
        }
        Insert: {
          id?: string
          organization_id: string
          email: string
          role: string
          created_at?: string
          expires_at: string
          token: string
          status?: string
        }
        Update: {
          id?: string
          organization_id?: string
          email?: string
          role?: string
          created_at?: string
          expires_at?: string
          token?: string
          status?: string
        }
      }
      keywords: {
        Row: {
          id: string
          keyword: string
          search_volume: number
          difficulty: number
          created_at: string
          organization_id: string
          language_id: string
        }
        Insert: {
          id?: string
          keyword: string
          search_volume?: number
          difficulty?: number
          created_at?: string
          organization_id: string
          language_id: string
        }
        Update: {
          id?: string
          keyword?: string
          search_volume?: number
          difficulty?: number
          created_at?: string
          organization_id?: string
          language_id?: string
        }
      }
      languages: {
        Row: {
          id: string
          name: string
          code: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          code: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          code?: string
          created_at?: string
        }
      }
      organization_languages: {
        Row: {
          id: string
          organization_id: string
          language_id: string
          created_at: string
          is_primary: boolean
        }
        Insert: {
          id?: string
          organization_id: string
          language_id: string
          created_at?: string
          is_primary?: boolean
        }
        Update: {
          id?: string
          organization_id?: string
          language_id?: string
          created_at?: string
          is_primary?: boolean
        }
      }
      organization_users: {
        Row: {
          id: string
          organization_id: string
          user_id: string
          role: string
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          user_id: string
          role: string
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          user_id?: string
          role?: string
          created_at?: string
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          created_at: string
          website_url: string | null
          sitemap_url: string | null
          onboarding_completed: boolean
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
          website_url?: string | null
          sitemap_url?: string | null
          onboarding_completed?: boolean
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
          website_url?: string | null
          sitemap_url?: string | null
          onboarding_completed?: boolean
        }
      }
      password_reset_tokens: {
        Row: {
          id: string
          user_id: string
          token: string
          created_at: string
          expires_at: string
          used: boolean
        }
        Insert: {
          id?: string
          user_id: string
          token: string
          created_at?: string
          expires_at: string
          used?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          token?: string
          created_at?: string
          expires_at?: string
          used?: boolean
        }
      }
      referrals: {
        Row: {
          id: string
          referrer_id: string
          referred_email: string
          status: string
          created_at: string
          code: string
          converted_at: string | null
        }
        Insert: {
          id?: string
          referrer_id: string
          referred_email: string
          status?: string
          created_at?: string
          code: string
          converted_at?: string | null
        }
        Update: {
          id?: string
          referrer_id?: string
          referred_email?: string
          status?: string
          created_at?: string
          code?: string
          converted_at?: string | null
        }
      }
      settings: {
        Row: {
          id: string
          organization_id: string
          key: string
          value: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          key: string
          value: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          key?: string
          value?: Json
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          status: string
          plan_id: string
          current_period_end: string
          created_at: string
          stripe_subscription_id: string | null
          stripe_customer_id: string | null
          canceled_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          status: string
          plan_id: string
          current_period_end: string
          created_at?: string
          stripe_subscription_id?: string | null
          stripe_customer_id?: string | null
          canceled_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          status?: string
          plan_id?: string
          current_period_end?: string
          created_at?: string
          stripe_subscription_id?: string | null
          stripe_customer_id?: string | null
          canceled_at?: string | null
        }
      }
      users: {
        Row: {
          id: string
          email: string
          name: string
          created_at: string
          avatar_url: string | null
          last_login: string | null
          email_verified: boolean
        }
        Insert: {
          id?: string
          email: string
          name: string
          created_at?: string
          avatar_url?: string | null
          last_login?: string | null
          email_verified?: boolean
        }
        Update: {
          id?: string
          email?: string
          name?: string
          created_at?: string
          avatar_url?: string | null
          last_login?: string | null
          email_verified?: boolean
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
