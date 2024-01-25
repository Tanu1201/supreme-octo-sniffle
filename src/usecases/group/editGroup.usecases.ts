import { UserM } from 'src/domain/model/user';
import { GroupRepository } from 'src/domain/repositories/groupRepository.interface';

export class EditGroupAdminUseCases {
  constructor(private readonly groupRepository: GroupRepository) {}

  async execute(id: string, adminId: string) {
    return await this.groupRepository.editGroupAdmin(id, adminId);
  }
}
