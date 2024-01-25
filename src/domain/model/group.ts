import { UserM, UserWithoutPassword } from './user';

export class GroupM {
  id?: string;
  name: string;
  adminId?: string;
  admin?: UserWithoutPassword;
  createdAt?: Date;
  updatedAt?: Date;
}

export class GroupWithUsersM extends GroupM {
  groupUsers: UserM[];
}
