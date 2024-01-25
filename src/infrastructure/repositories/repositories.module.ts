import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { User } from '../entities/user.entity';
import { DatabaseUserRepository } from './user.repository';
import { DatabasePasswordTokenRepository } from './passwordToken.repository';
import { PasswordToken } from '../entities/passwordToken.entity';
import { DatabaseGroupRepository } from './group.repository';
import { Group } from '../entities/group.entity';
import { UserGroup } from '../entities/userGroup.entity';
import { Transaction } from '../entities/transaction.entity';
import { DatabaseTransactionRepository } from './transaction.repository';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([User, PasswordToken, Group, UserGroup, Transaction])],
  providers: [DatabaseUserRepository, DatabasePasswordTokenRepository, DatabaseGroupRepository, DatabaseTransactionRepository],
  exports: [DatabaseUserRepository, DatabasePasswordTokenRepository, DatabaseGroupRepository, DatabaseTransactionRepository],
})
export class RepositoriesModule {}
