import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserM, UserWithoutPassword } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/userRepository.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}
  async updateRefreshToken(email: string, refreshToken: string): Promise<void> {
    await this.userEntityRepository.update(
      {
        email: email,
      },
      { refreshToken },
    );
  }
  async getUserByEmail(email: string): Promise<UserM> {
    const userEntity = await this.userEntityRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!userEntity) {
      return null;
    }
    return this.toUser(userEntity);
  }

  async createUser(user: UserM): Promise<UserWithoutPassword> {
    const userEntity = await this.userEntityRepository.save(user);
    const { password, ...userWithoutPassword } = this.toUser(userEntity);
    return userWithoutPassword;
  }

  async getUsers(): Promise<UserWithoutPassword[]> {
    const userEntities = await this.userEntityRepository.find();
    return userEntities.map((userEntity) => {
      const { password, refreshToken, ...userWithoutPassword } = this.toUser(userEntity);
      return userWithoutPassword;
    });
  }

  async getUserById(id: string): Promise<UserWithoutPassword> {
    const userEntity = await this.userEntityRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!userEntity) {
      return null;
    }
    const { password, ...userWithoutPassword } = this.toUser(userEntity);
    return userWithoutPassword;
  }

  async updatePassword(id: string, password: string): Promise<void> {
    await this.userEntityRepository.update(
      {
        id,
      },
      {
        password,
      },
    );
  }

  private toUser(userEntity: User): UserM {
    const adminUser: UserM = new UserM();

    adminUser.id = userEntity.id;
    adminUser.email = userEntity.email;
    adminUser.name = userEntity.name;
    adminUser.password = userEntity.password;
    adminUser.role = userEntity.role;
    adminUser.createdAt = userEntity.createdAt;
    adminUser.updatedAt = userEntity.updatedAt;
    adminUser.refreshToken = userEntity.refreshToken;

    return adminUser;
  }

  async deleteUser(id: string): Promise<boolean> {
    const userDeleted = await this.userEntityRepository.delete(id);

    if (!userDeleted) {
      throw new Error('User not found');
    }

    return true;
  }
}
