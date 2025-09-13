import { CreateUserUseCase } from '../../application/use-cases/CreateUserUseCase';
import { GetUserUseCase } from '../../application/use-cases/GetUserUseCase';
import { CreateUserDto, UserResponseDto } from '../../application/dto/CreateUserDto';

export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserUseCase: GetUserUseCase
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserResponseDto> {
    try {
      return await this.createUserUseCase.execute(dto);
    } catch (error) {
      throw new Error(`Failed to create user: ${error}`);
    }
  }

  async getUser(id: string): Promise<UserResponseDto> {
    try {
      return await this.getUserUseCase.execute(id);
    } catch (error) {
      throw new Error(`Failed to get user: ${error}`);
    }
  }
}