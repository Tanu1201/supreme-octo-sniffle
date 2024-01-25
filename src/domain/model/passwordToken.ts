export class PasswordTokenM {
  userId: string;
  expiresAt: Date;
  used?: boolean = false;
}
