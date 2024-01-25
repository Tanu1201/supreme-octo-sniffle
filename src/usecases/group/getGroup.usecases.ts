import { UserM } from 'src/domain/model/user';
import { GroupRepository } from 'src/domain/repositories/groupRepository.interface';

export class GetGroupUseCases {
  constructor(private readonly groupRepository: GroupRepository) {}

  async execute(id: string, user: UserM) {
    return await this.groupRepository.getGroupById(id, user);
  }
}
