import { UserRepository } from 'src/domain/repositories/userRepository.interface';

export class DeleteUserUseCases {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string) {
    // delete the user
    return await this.userRepository.deleteUser(id);
  }
}
