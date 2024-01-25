import { PasswordTokenM } from '../model/passwordToken';

export interface PasswordTokenRepository {
  createPasswordToken(passwordToken: PasswordTokenM): Promise<string>;
  getPasswordTokenById(id: string): Promise<PasswordTokenM>;
  deletePasswordToken(id: string): Promise<void>;
}
