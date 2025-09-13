import { defineConfig } from 'vite'

export default defineConfig({
  // Development server configuration
  server: {
    host: '0.0.0.0', // Allow external connections (important for Docker)
    port: 5173,
    strictPort: true, // Fail if port is already in use
    watch: {
      usePolling: true, // Enable polling for Docker file watching
    },
  },

  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['@supabase/supabase-js']
        }
      }
    }
  },

  // Preview server configuration (for testing production build locally)
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: true,
  },
})