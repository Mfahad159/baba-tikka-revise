// Typed Supabase Database interface.
// Run `npx supabase gen types typescript --project-id <id> > lib/supabase/types.ts`
// to regenerate from your actual schema once tables are created.

// TODO: Adjust table names to match your final Supabase schema.
// Current placeholders: menu_items, categories, reservations

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      // TODO: Define columns to match your actual Supabase schema
      menu_items: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          description: string | null;
          price: number;
          category_id: string | null;
          image_url: string | null;
          is_available: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          description?: string | null;
          price: number;
          category_id?: string | null;
          image_url?: string | null;
          is_available?: boolean;
        };
        Update: Partial<Database['public']['Tables']['menu_items']['Insert']>;
      };
      categories: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          slug: string;
          sort_order: number | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          slug: string;
          sort_order?: number | null;
        };
        Update: Partial<Database['public']['Tables']['categories']['Insert']>;
      };
      reservations: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          phone: string | null;
          party_size: number;
          date: string;
          time: string;
          notes: string | null;
          status: 'pending' | 'confirmed' | 'cancelled';
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          phone?: string | null;
          party_size: number;
          date: string;
          time: string;
          notes?: string | null;
          status?: 'pending' | 'confirmed' | 'cancelled';
        };
        Update: Partial<Database['public']['Tables']['reservations']['Insert']>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
