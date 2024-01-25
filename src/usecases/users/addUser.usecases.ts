import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import { UserM } from 'src/domain/model/user';
import { PasswordTokenRepository } from 'src/domain/repositories/passwordTokenRepository.interface';
import { UserRepository } from 'src/domain/repositories/userRepository.interface';
import { MailService } from 'src/infrastructure/config/mail/mail.service';

export class AddUserUseCases {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordTokenRepository: PasswordTokenRepository,
    private readonly bcryptService: IBcryptService,
    private readonly mailService: MailService,
  ) {}

  async execute(user: UserM) {
    const createdUser = await this.userRepository.createUser({ ...user, password: await this.bcryptService.hash(user.password) });
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);
    const createdPasswordToken = await this.passwordTokenRepository.createPasswordToken({
      userId: createdUser.id,
      expiresAt,
    });
    await this.mailService.sendPasswordLink(createdUser, createdPasswordToken);
    return createdUser;
  }
}
