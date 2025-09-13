# Multi-stage Dockerfile for Hexagonal Architecture Vite App

# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production stage with Nginx
FROM nginx:alpine AS production

# Install Node.js for potential server-side features
RUN apk add --no-cache nodejs npm

# Copy custom nginx configuration
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy environment template and startup script
COPY docker/env-template.js /usr/share/nginx/html/
COPY docker/startup.sh /startup.sh
RUN chmod +x /startup.sh

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Use startup script as entrypoint
CMD ["/startup.sh"]