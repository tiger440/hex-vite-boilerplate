import { UserRepository } from '../domain/repositories/UserRepository';
import { InMemoryUserRepository } from '../infrastructure/repositories/InMemoryUserRepository';
import { SupabaseUserRepository } from '../infrastructure/repositories/SupabaseUserRepository';
import { CreateUserUseCase } from '../application/use-cases/CreateUserUseCase';
import { GetUserUseCase } from '../application/use-cases/GetUserUseCase';
import { UserController } from '../presentation/controllers/UserController';
import { supabaseService } from '../infrastructure/database/supabase';
import { getDatabaseMode } from '../utils/env';

export class DIContainer {
  private static instance: DIContainer;
  private userRepository: UserRepository;
  private createUserUseCase: CreateUserUseCase;
  private getUserUseCase: GetUserUseCase;
  private userController: UserController;

  private constructor() {
    this.userRepository = this.createUserRepository();
    this.createUserUseCase = new CreateUserUseCase(this.userRepository);
    this.getUserUseCase = new GetUserUseCase(this.userRepository);
    this.userController = new UserController(
      this.createUserUseCase,
      this.getUserUseCase
    );
  }

  private createUserRepository(): UserRepository {
    const databaseMode = getDatabaseMode();

    if (databaseMode === 'supabase') {
      try {
        if (supabaseService.isConfigured()) {
          console.log('✅ Using Supabase database');
          return new SupabaseUserRepository();
        } else {
          console.warn('⚠️ Supabase not configured, falling back to in-memory database');
          return new InMemoryUserRepository();
        }
      } catch (error) {
        console.error('❌ Failed to initialize Supabase, falling back to in-memory database:', error);
        return new InMemoryUserRepository();
      }
    }

    console.log('💾 Using in-memory database');
    return new InMemoryUserRepository();
  }

  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  getUserController(): UserController {
    return this.userController;
  }

  getUserRepository(): UserRepository {
    return this.userRepository;
  }

  getDatabaseMode(): string {
    return this.userRepository instanceof SupabaseUserRepository ? 'supabase' : 'memory';
  }
}