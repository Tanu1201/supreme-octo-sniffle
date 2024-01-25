import { UserM, UserWithoutPassword } from '../model/user';

export interface UserRepository {
  getUserByEmail(email: string): Promise<UserM>;
  updateRefreshToken(email: string, refreshToken: string): Promise<void>;
  getUsers(): Promise<UserWithoutPassword[]>;
  getUserById(id: string): Promise<UserWithoutPassword>;
  createUser(user: UserM): Promise<UserWithoutPassword>;
  updatePassword(id: string, password: string): Promise<void>;
}
