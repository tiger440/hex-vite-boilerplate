import { UserRepository } from '../../domain/repositories/UserRepository';
import { UserEntity } from '../../domain/entities/User';
import { UserService } from '../../domain/services/UserService';
import { CreateUserDto, UserResponseDto } from '../dto/CreateUserDto';

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(dto: CreateUserDto): Promise<UserResponseDto> {
    if (!UserService.canCreateUser(dto.email, dto.name)) {
      throw new Error('Invalid user data');
    }

    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = UserEntity.create(dto.email, dto.name);
    const savedUser = await this.userRepository.save(user);

    return {
      id: savedUser.id,
      email: savedUser.email,
      name: savedUser.name,
      createdAt: savedUser.createdAt.toISOString(),
      updatedAt: savedUser.updatedAt.toISOString(),
    };
  }
}