import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { Group } from '../entities/group.entity';
import { PasswordToken } from '../entities/passwordToken.entity';
import { Transaction } from '../entities/transaction.entity';
import { User } from '../entities/user.entity';
import { UserGroup } from '../entities/userGroup.entity';
import { ZohoToken } from '../entities/zohoToken.entity';
import { DatabaseGroupRepository } from './group.repository';
import { DatabasePasswordTokenRepository } from './passwordToken.repository';
import { DatabaseTransactionRepository } from './transaction.repository';
import { DatabaseUserRepository } from './user.repository';
import { DatabaseZohoTokenRepository } from './zohoToken.repository';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([User, PasswordToken, Group, UserGroup, Transaction, ZohoToken])],
  providers: [
    DatabaseUserRepository,
    DatabasePasswordTokenRepository,
    DatabaseGroupRepository,
    DatabaseTransactionRepository,
    DatabaseZohoTokenRepository,
  ],
  exports: [
    DatabaseUserRepository,
    DatabasePasswordTokenRepository,
    DatabaseGroupRepository,
    DatabaseTransactionRepository,
    DatabaseZohoTokenRepository,
  ],
})
export class RepositoriesModule {}
