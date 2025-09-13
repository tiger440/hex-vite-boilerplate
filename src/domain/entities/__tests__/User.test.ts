import { describe, it, expect } from 'vitest';
import { UserEntity } from '../User';

describe('UserEntity', () => {
  it('should create a user with valid data', () => {
    const user = UserEntity.create('test@example.com', 'John Doe');

    expect(user.email).toBe('test@example.com');
    expect(user.name).toBe('John Doe');
    expect(user.id).toBeDefined();
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should update user name', () => {
    const user = UserEntity.create('test@example.com', 'John Doe');
    const originalUpdatedAt = user.updatedAt;

    setTimeout(() => {
      const updatedUser = user.updateName('Jane Doe');

      expect(updatedUser.name).toBe('Jane Doe');
      expect(updatedUser.email).toBe('test@example.com');
      expect(updatedUser.id).toBe(user.id);
      expect(updatedUser.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    }, 1);
  });

  it('should maintain immutability when updating', () => {
    const originalUser = UserEntity.create('test@example.com', 'John Doe');
    const updatedUser = originalUser.updateName('Jane Doe');

    expect(originalUser.name).toBe('John Doe');
    expect(updatedUser.name).toBe('Jane Doe');
    expect(originalUser).not.toBe(updatedUser);
  });
});