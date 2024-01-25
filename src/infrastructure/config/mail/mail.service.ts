import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserWithoutPassword } from 'src/domain/model/user';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService, private readonly configService: ConfigService) {}

  async sendPasswordLink(user: UserWithoutPassword, token: string) {
    const url = `${this.configService.get('API_URL')}/auth/setPassword/${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Please set your password',
      template: './passwordLink',
      context: {
        name: user.name,
        url,
      },
    });
  }
}
