import { UserEntity } from '../entities/User';

export interface UserRepository {
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  save(user: UserEntity): Promise<UserEntity>;
  delete(id: string): Promise<void>;
  findAll(): Promise<UserEntity[]>;
}