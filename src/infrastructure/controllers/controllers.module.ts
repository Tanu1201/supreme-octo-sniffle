import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { GroupController } from './group/group.controller';
import { TransactionController } from './transaction/transaction.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [AuthController, UserController, GroupController, TransactionController],
})
export class ControllersModule {}
