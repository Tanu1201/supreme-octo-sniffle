import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordTokenM } from 'src/domain/model/passwordToken';
import { PasswordTokenRepository } from 'src/domain/repositories/passwordTokenRepository.interface';
import { Repository } from 'typeorm';
import { PasswordToken } from '../entities/passwordToken.entity';

@Injectable()
export class DatabasePasswordTokenRepository implements PasswordTokenRepository {
  constructor(
    @InjectRepository(PasswordToken)
    private readonly passwordTokenEntityRepository: Repository<PasswordToken>,
  ) {}

  async createPasswordToken(passwordToken: PasswordTokenM): Promise<string> {
    const createdPasswordToken = await this.passwordTokenEntityRepository.create(passwordToken).save();

    return createdPasswordToken.id;
  }

  async getPasswordTokenById(id: string): Promise<PasswordToken> {
    const token = await this.passwordTokenEntityRepository.findOne({ where: { id } });
    if (!token) {
      throw new Error('Link expired or invalid');
    }
    return token;
  }

  async deletePasswordToken(id: string): Promise<void> {
    return await this.passwordTokenEntityRepository.delete({ id }).then(() => undefined);
  }
}
