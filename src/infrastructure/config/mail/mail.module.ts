import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: (config: EnvironmentConfigService) => ({
        transport: {
          host: config.getNodemailerHost(),
          secure: false,
          auth: {
            user: config.getNodemailerUser(),
            pass: config.getNodemailerPassword(),
          },
        },
        defaults: {
          from: 'Bhumio Project - ' + config.getNodemailerFrom(),
        },
        template: {
          dir: 'src/domain/mail/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  exports: [MailService],
  providers: [MailService],
})
export class MailModule {}
