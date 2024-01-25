import { Role } from './role.enum';

export class UserWithoutPassword {
  id?: string;
  email: string;
  name: string;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
  refreshToken?: string;
  createdById?: string;
}

export class UserM extends UserWithoutPassword {
  password: string;
}
