# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production (runs tsc + vite build)
npm run preview          # Preview production build

# Code Quality
npm run lint             # Lint TypeScript files in src/
npm run lint:fix         # Auto-fix linting issues
npm run typecheck        # Run TypeScript type checking without emitting files

# Testing
npm run test             # Run tests with Vitest
npm run test:ui          # Run tests with Vitest UI

# Docker Commands
npm run docker:dev       # Start development environment with Docker
npm run docker:dev:down  # Stop development environment
npm run docker:dev:db    # Start development with Supabase database
npm run docker:prod      # Start production environment
npm run docker:prod:ssl  # Start production with SSL proxy
npm run docker:build     # Build production Docker image
```

## Architecture Overview

This is a **Hexagonal Architecture (Ports and Adapters)** boilerplate using Vite and TypeScript. The architecture enforces strict separation between business logic and external dependencies.

### Core Layers

- **Domain Layer** (`src/domain/`): Pure business logic, framework-agnostic
  - `entities/`: Business entities with validation logic
  - `repositories/`: Interfaces defining data access contracts
  - `services/`: Business services and domain logic

- **Application Layer** (`src/application/`): Orchestrates use cases
  - `use-cases/`: Application-specific business rules
  - `dto/`: Data Transfer Objects for application boundaries

- **Infrastructure Layer** (`src/infrastructure/`): External concerns
  - `repositories/`: Concrete implementations (InMemory, Supabase)
  - `database/`: Database connections and setup
  - `http/`: External API clients

- **Presentation Layer** (`src/presentation/`): User interface
  - `components/`: UI components (vanilla TypeScript)
  - `controllers/`: HTTP controllers and input handlers
  - `pages/`: Application pages

- **Container** (`src/container/`): Dependency Injection
  - `DIContainer.ts`: Singleton managing all dependencies

### Dependency Injection Pattern

The `DIContainer` class manages all dependencies using a singleton pattern. It automatically chooses between database modes based on environment variables:

- `VITE_DATABASE_MODE=memory`: Uses InMemoryUserRepository
- `VITE_DATABASE_MODE=supabase`: Uses SupabaseUserRepository (with fallback to memory)

## Database Configuration

The project supports dual database modes via environment variables:

```env
VITE_DATABASE_MODE=memory        # Default: in-memory storage
VITE_DATABASE_MODE=supabase      # Persistent Supabase storage
```

For Supabase setup, copy `.env.example` to `.env` and follow the complete guide in `SUPABASE_SETUP.md`.

## Key Architectural Principles

1. **Dependencies flow inward**: Domain layer has no external dependencies
2. **Repository pattern**: Data access abstracted through interfaces
3. **Use case driven**: Application logic organized around business use cases
4. **Technology agnostic**: Easy to swap infrastructure implementations
5. **Dependency injection**: All dependencies managed centrally

## Testing

- Uses Vitest with jsdom environment
- Tests are co-located in `__tests__` folders
- Domain entities and use cases have comprehensive test coverage
- Run single test file: `npm test -- User.test.ts`

## File Structure Conventions

- Entity classes use PascalCase (e.g., `UserEntity`)
- Repository interfaces end with `Repository` (e.g., `UserRepository`)
- Use cases end with `UseCase` (e.g., `CreateUserUseCase`)
- DTOs end with `Dto` (e.g., `CreateUserDto`)
- Implementation classes describe their type (e.g., `InMemoryUserRepository`)

## Docker Configuration

The project is fully containerized with multiple deployment options:

### Development with Docker
- `docker-compose.dev.yml`: Hot-reload development environment
- `Dockerfile.dev`: Development container with source mounting
- Optional Supabase local instance with profiles

### Production Deployment
- `Dockerfile`: Multi-stage build with Nginx serving
- `docker-compose.yml`: Production environment with health checks
- Nginx configuration with security headers and caching
- SSL support via nginx-proxy profile

### Environment Variables in Docker
All environment variables are injected at runtime:
```env
VITE_DATABASE_MODE=memory|supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_key
```

### Docker Best Practices Applied
- Multi-stage builds to minimize image size
- Non-root user in containers
- Health checks for monitoring
- Security headers via Nginx
- Optimized .dockerignore for faster builds