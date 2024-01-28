import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ZohoTokenRepository } from 'src/domain/repositories/zohoTokenRepository.interface';
import { Repository } from 'typeorm';
import { ZohoToken } from '../entities/zohoToken.entity';

@Injectable()
export class DatabaseZohoTokenRepository implements ZohoTokenRepository {
  constructor(
    @InjectRepository(ZohoToken)
    private readonly zohoTokenRepository: Repository<ZohoToken>,
  ) {}

  async getZohoAcessToken(): Promise<string> {
    const zohoToken = await this.zohoTokenRepository.findOne();

    if (!zohoToken || zohoToken.createdAt.getTime() + zohoToken.expiresIn * 1000 < new Date().getTime()) {
      return null;
    }

    return zohoToken.accessToken;
  }

  async createAccessToken(token: string, expiresIn: number): Promise<void> {
    await this.zohoTokenRepository
      .create({
        accessToken: token,
        expiresIn,
      })
      .save();
  }
}
