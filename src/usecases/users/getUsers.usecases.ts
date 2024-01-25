export class GetUsersUseCases {
  constructor(private readonly userRepository) {}

  async execute() {
    return await this.userRepository.getUsers();
  }
}
