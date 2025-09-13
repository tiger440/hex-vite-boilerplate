import { UserRepository } from '../../domain/repositories/UserRepository';
import { UserEntity } from '../../domain/entities/User';
import { getSupabaseClient, Database } from '../database/supabase';

export class SupabaseUserRepository implements UserRepository {
  private get client() {
    return getSupabaseClient();
  }

  async findById(id: string): Promise<UserEntity | null> {
    try {
      const { data, error } = await this.client
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null;
        }
        throw new Error(`Failed to find user by id: ${error.message}`);
      }

      return this.mapToEntity(data);
    } catch (error) {
      console.error('Error finding user by id:', error);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    try {
      const { data, error } = await this.client
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null;
        }
        throw new Error(`Failed to find user by email: ${error.message}`);
      }

      return this.mapToEntity(data);
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

  async save(user: UserEntity): Promise<UserEntity> {
    try {
      const userData = this.mapToDatabase(user);

      const { data, error } = await this.client
        .from('users')
        .upsert(userData as any, {
          onConflict: 'id',
        })
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to save user: ${error.message}`);
      }

      return this.mapToEntity(data);
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const { error } = await this.client
        .from('users')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(`Failed to delete user: ${error.message}`);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      const { data, error } = await this.client
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(`Failed to find all users: ${error.message}`);
      }

      return data.map(user => this.mapToEntity(user));
    } catch (error) {
      console.error('Error finding all users:', error);
      throw error;
    }
  }

  private mapToEntity(data: Database['public']['Tables']['users']['Row']): UserEntity {
    return new UserEntity(
      data.id,
      data.email,
      data.name,
      new Date(data.created_at),
      new Date(data.updated_at)
    );
  }

  private mapToDatabase(user: UserEntity): Database['public']['Tables']['users']['Insert'] {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      created_at: user.createdAt.toISOString(),
      updated_at: user.updatedAt.toISOString(),
    };
  }
}