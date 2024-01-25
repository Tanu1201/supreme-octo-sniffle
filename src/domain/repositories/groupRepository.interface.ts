import { GroupM } from '../model/group';
import { UserM } from '../model/user';

export interface GroupRepository {
  createGroup(name: string, adminId?: string): Promise<GroupM>;
  getGroups(user: UserM): Promise<GroupM[]>;
  getGroupById(id: string, user: UserM): Promise<GroupM>;
  editGroupAdmin(groupId: string, adminId: string): Promise<GroupM>;
  addUserToGroup(groupId: string, userId: string, loggedInUser: UserM): Promise<string>;
  getGroupUsers(groupId: string): Promise<UserM[]>;
}
