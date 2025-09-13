/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DATABASE_MODE: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Runtime environment configuration (injected by Docker at runtime)
declare interface Window {
  ENV?: {
    VITE_DATABASE_MODE?: string
    VITE_SUPABASE_URL?: string
    VITE_SUPABASE_ANON_KEY?: string
  }
}