#!/bin/sh

# Create runtime environment configuration
cat > /usr/share/nginx/html/config.js << EOF
window.ENV = {
  VITE_DATABASE_MODE: '${VITE_DATABASE_MODE:-memory}',
  VITE_SUPABASE_URL: '${VITE_SUPABASE_URL:-}',
  VITE_SUPABASE_ANON_KEY: '${VITE_SUPABASE_ANON_KEY:-}'
};
EOF

# Start nginx
exec nginx -g 'daemon off;'