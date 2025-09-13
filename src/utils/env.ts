/**
 * Environment utility to handle both build-time (Vite) and runtime (Docker) configuration
 */

export function getEnvVar(key: string): string | undefined {
  // Try runtime environment first (Docker injected)
  if (typeof window !== 'undefined' && window.ENV) {
    const value = (window.ENV as any)[key];
    if (value !== undefined && value !== null && value !== '') {
      return value;
    }
  }

  // Fallback to build-time environment (Vite)
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return (import.meta.env as any)[key];
  }

  return undefined;
}

export function getDatabaseMode(): string {
  return getEnvVar('VITE_DATABASE_MODE') || 'memory';
}

export function getSupabaseUrl(): string | undefined {
  return getEnvVar('VITE_SUPABASE_URL');
}

export function getSupabaseAnonKey(): string | undefined {
  return getEnvVar('VITE_SUPABASE_ANON_KEY');
}