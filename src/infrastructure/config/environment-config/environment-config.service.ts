import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NodemailerConfig } from 'src/domain/config/nodemailer.interface';
import { ZohoConfig } from 'src/domain/config/zoho.interface';
import { DatabaseConfig } from '../../../domain/config/database.interface';
import { JWTConfig } from '../../../domain/config/jwt.interface';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig, JWTConfig, NodemailerConfig, ZohoConfig {
  constructor(private configService: ConfigService) {}

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  getJwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME');
  }

  getJwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET');
  }

  getJwtRefreshExpirationTime(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
  }

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER');
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }

  getDatabaseSchema(): string {
    return this.configService.get<string>('DATABASE_SCHEMA');
  }

  getDatabaseSync(): boolean {
    return this.configService.get<boolean>('DATABASE_SYNCHRONIZE');
  }

  getNodemailerHost(): string {
    return this.configService.get<string>('NODEMAILER_HOST');
  }

  getNodemailerPort(): number {
    return this.configService.get<number | undefined>('NODEMAILER_PORT');
  }

  getNodemailerUser(): string {
    return this.configService.get<string>('NODEMAILER_USER');
  }

  getNodemailerPassword(): string {
    return this.configService.get<string>('NODEMAILER_PASSWORD');
  }

  getNodemailerFrom(): string {
    return this.configService.get<string>('NODEMAILER_FROM');
  }

  getZohoClientId(): string {
    return this.configService.get<string>('ZOHO_CLIENT_ID');
  }

  getZohoClientSecret(): string {
    return this.configService.get<string>('ZOHO_CLIENT_SECRET');
  }

  getZohoRefreshToken(): string {
    return this.configService.get<string>('ZOHO_REFRESH_TOKEN');
  }
}
