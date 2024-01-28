import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { GroupController } from './group/group.controller';
import { TransactionController } from './transaction/transaction.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [UsecasesProxyModule.register(), NestjsFormDataModule],
  controllers: [AuthController, UserController, GroupController, TransactionController],
})
export class ControllersModule {}
