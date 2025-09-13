import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseUrl, getSupabaseAnonKey } from '../../utils/env';

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

class SupabaseService {
  private static instance: SupabaseService;
  private client: SupabaseClient<Database> | null = null;

  private constructor() {}

  static getInstance(): SupabaseService {
    if (!SupabaseService.instance) {
      SupabaseService.instance = new SupabaseService();
    }
    return SupabaseService.instance;
  }

  initialize(): SupabaseClient<Database> {
    if (this.client) {
      return this.client;
    }

    const supabaseUrl = getSupabaseUrl();
    const supabaseAnonKey = getSupabaseAnonKey();

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error(
        'Missing Supabase configuration. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
      );
    }

    if (supabaseUrl === 'your_supabase_project_url_here' || supabaseAnonKey === 'your_supabase_anon_key_here') {
      throw new Error(
        'Please configure your Supabase credentials in the .env file. See .env.example for reference.'
      );
    }

    this.client = createClient<Database>(supabaseUrl, supabaseAnonKey);
    return this.client;
  }

  getClient(): SupabaseClient<Database> {
    if (!this.client) {
      return this.initialize();
    }
    return this.client;
  }

  isConfigured(): boolean {
    const supabaseUrl = getSupabaseUrl();
    const supabaseAnonKey = getSupabaseAnonKey();

    return !!(
      supabaseUrl &&
      supabaseAnonKey &&
      supabaseUrl !== 'your_supabase_project_url_here' &&
      supabaseAnonKey !== 'your_supabase_anon_key_here'
    );
  }
}

export const supabaseService = SupabaseService.getInstance();
export const getSupabaseClient = () => supabaseService.getClient();