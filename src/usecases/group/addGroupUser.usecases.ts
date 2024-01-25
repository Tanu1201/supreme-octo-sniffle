import { UserM } from 'src/domain/model/user';
import { GroupRepository } from 'src/domain/repositories/groupRepository.interface';

export class AddGroupUserUseCases {
  constructor(private readonly groupRepository: GroupRepository) {}

  async execute(groupId: string, userId: string, loggedInUser: UserM) {
    return await this.groupRepository.addUserToGroup(groupId, userId, loggedInUser);
  }
}
