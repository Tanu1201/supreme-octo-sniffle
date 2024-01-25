import { UserRepository } from 'src/domain/repositories/userRepository.interface';

export class GetUserUseCases {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string) {
    return await this.userRepository.getUserById(id);
  }
}
