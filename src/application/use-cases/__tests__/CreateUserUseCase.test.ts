import { describe, it, expect, beforeEach } from 'vitest';
import { CreateUserUseCase } from '../CreateUserUseCase';
import { InMemoryUserRepository } from '../../../infrastructure/repositories/InMemoryUserRepository';
import { UserEntity } from '../../../domain/entities/User';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let repository: InMemoryUserRepository;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
    useCase = new CreateUserUseCase(repository);
  });

  it('should create a user with valid data', async () => {
    const dto = {
      email: 'test@example.com',
      name: 'John Doe'
    };

    const result = await useCase.execute(dto);

    expect(result.email).toBe(dto.email);
    expect(result.name).toBe(dto.name);
    expect(result.id).toBeDefined();
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });

  it('should throw error for invalid email', async () => {
    const dto = {
      email: 'invalid-email',
      name: 'John Doe'
    };

    await expect(useCase.execute(dto)).rejects.toThrow('Invalid user data');
  });

  it('should throw error for invalid name', async () => {
    const dto = {
      email: 'test@example.com',
      name: 'J'
    };

    await expect(useCase.execute(dto)).rejects.toThrow('Invalid user data');
  });

  it('should throw error if user already exists', async () => {
    const existingUser = UserEntity.create('test@example.com', 'Jane Doe');
    await repository.save(existingUser);

    const dto = {
      email: 'test@example.com',
      name: 'John Doe'
    };

    await expect(useCase.execute(dto)).rejects.toThrow('User already exists');
  });
});