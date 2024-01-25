import { GroupRepository } from 'src/domain/repositories/groupRepository.interface';

export class AddGroupUseCases {
  constructor(private readonly groupRepository: GroupRepository) {}

  async execute(name: string, adminId?: string) {
    return await this.groupRepository.createGroup(name, adminId);
  }
}
