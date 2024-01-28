import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JwtStrategy } from './infrastructure/common/strategies/jwt.strategy';
import { JwtRefreshTokenStrategy } from './infrastructure/common/strategies/jwtRefresh.strategy';
import { LocalStrategy } from './infrastructure/common/strategies/local.strategy';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { MailModule } from './infrastructure/config/mail/mail.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { BcryptModule } from './infrastructure/services/bcrypt/bcrypt.module';
import { JwtModule as JwtServiceModule } from './infrastructure/services/jwt/jwt.module';
import { ZohoSignServiceModule } from './infrastructure/services/zohoSign/zohoSign.module';
import { UsecasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.secret,
    }),
    LoggerModule,
    ExceptionsModule,
    UsecasesProxyModule.register(),
    ControllersModule,
    BcryptModule,
    JwtServiceModule,
    ZohoSignServiceModule,
    EnvironmentConfigModule,
    MailModule,
    // MulterModule.register({
    //   dest: './files',
    // }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
    }),
  ],
  providers: [LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
})
export class AppModule {}
