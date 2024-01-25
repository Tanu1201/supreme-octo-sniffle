import { UserM } from 'src/domain/model/user';
import { GroupRepository } from 'src/domain/repositories/groupRepository.interface';

export class GetGroupsUseCases {
  constructor(private readonly groupRepository: GroupRepository) {}

  async execute(user: UserM) {
    return await this.groupRepository.getGroups(user);
  }
}
