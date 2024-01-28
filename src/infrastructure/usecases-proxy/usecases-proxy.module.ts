import { DynamicModule, Module } from '@nestjs/common';
import { IsAuthenticatedUseCases } from '../../usecases/auth/isAuthenticated.usecases';
import { LoginUseCases } from '../../usecases/auth/login.usecases';
import { LogoutUseCases } from '../../usecases/auth/logout.usecases';

import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';

import { RepositoriesModule } from '../repositories/repositories.module';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { JwtModule } from '../services/jwt/jwt.module';
import { JwtTokenService } from '../services/jwt/jwt.service';

import { DatabaseUserRepository } from '../repositories/user.repository';

import { TransactionRepository } from 'src/domain/repositories/transactionRepository.interface';
import { AddGroupUseCases } from 'src/usecases/group/addGroup.usecases';
import { AddGroupUserUseCases } from 'src/usecases/group/addGroupUser.usecases';
import { EditGroupAdminUseCases } from 'src/usecases/group/editGroup.usecases';
import { GetGroupUseCases } from 'src/usecases/group/getGroup.usecases';
import { GetGroupsUseCases } from 'src/usecases/group/getGroups.usecases';
import { AddTransactionUseCases } from 'src/usecases/transaction/addTransaction.usecases';
import { DeleteTransactionUseCases } from 'src/usecases/transaction/deleteTransaction.usecases';
import { GetTransactionUseCases } from 'src/usecases/transaction/getTransaction.usecases';
import { GetTransactionsUseCases } from 'src/usecases/transaction/getTransactions.usecases';
import { UpdateTransactionUseCases } from 'src/usecases/transaction/updateTransaction.usecases';
import { AddUserUseCases } from 'src/usecases/users/addUser.usecases';
import { DeleteUserUseCases } from 'src/usecases/users/deleteUser.usecases';
import { GetUserUseCases } from 'src/usecases/users/getUser.usecases';
import { GetUsersUseCases } from 'src/usecases/users/getUsers.usecases';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { MailModule } from '../config/mail/mail.module';
import { MailService } from '../config/mail/mail.service';
import { DatabaseGroupRepository } from '../repositories/group.repository';
import { DatabasePasswordTokenRepository } from '../repositories/passwordToken.repository';
import { DatabaseTransactionRepository } from '../repositories/transaction.repository';
import { DatabaseZohoTokenRepository } from '../repositories/zohoToken.repository';
import { ZohoSignServiceModule } from '../services/zohoSign/zohoSign.module';
import { ZohoSignService } from '../services/zohoSign/zohoSign.service';
import { UseCaseProxy } from './usecases-proxy';

@Module({
  imports: [
    LoggerModule,
    JwtModule,
    BcryptModule,
    EnvironmentConfigModule,
    RepositoriesModule,
    ExceptionsModule,
    MailModule,
    ZohoSignServiceModule,
  ],
})
export class UsecasesProxyModule {
  // Auth
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
  static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';

  // User
  static GET_USER_USECASES_PROXY = 'getUserUsecasesProxy';
  static GET_USERS_USECASES_PROXY = 'getUsersUsecasesProxy';
  static POST_USER_USECASES_PROXY = 'postUserUsecasesProxy';
  static Delete_USER_USECASES_PROXY = 'deleteUserProxy';

  // Group
  static GET_GROUP_USECASES_PROXY = 'getGroupUsecasesProxy';
  static GET_GROUPS_USECASES_PROXY = 'getGroupsUsecasesProxy';
  static POST_GROUP_USECASES_PROXY = 'postGroupUsecasesProxy';
  static EDIT_GROUP_ADMIN_USECASES_PROXY = 'editGroupUsecasesProxy';
  static ADD_GROUP_USER_USECASES_PROXY = 'addGroupUserUsecasesProxy';

  // Transaction
  static GET_TRANSACTION_USECASES_PROXY = 'getTransactionUsecasesProxy';
  static GET_TRANSACTIONS_USECASES_PROXY = 'getTransactoinsUsecasesProxy';
  static POST_TRANSACTION_USECASES_PROXY = 'postTransactionUsecasesProxy';
  static EDIT_TRANSACTION_USECASES_PROXY = 'editTransactionUsecasesProxy';
  static DELETE_TRANSACTION_USECASES_PROXY = 'deleteTransactionUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [
            LoggerService,
            JwtTokenService,
            EnvironmentConfigService,
            DatabaseUserRepository,
            BcryptService,
            DatabasePasswordTokenRepository,
          ],
          provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService,
            passwordTokenRepository: DatabasePasswordTokenRepository,
          ) =>
            new UseCaseProxy(
              new LoginUseCases(logger, jwtTokenService, config, userRepo, bcryptService, passwordTokenRepository),
            ),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
          useFactory: (userRepo: DatabaseUserRepository) => new UseCaseProxy(new IsAuthenticatedUseCases(userRepo)),
        },
        {
          inject: [],
          provide: UsecasesProxyModule.LOGOUT_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new LogoutUseCases()),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.GET_USER_USECASES_PROXY,
          useFactory: (userRepository: DatabaseUserRepository) => new UseCaseProxy(new GetUserUseCases(userRepository)),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.Delete_USER_USECASES_PROXY,
          useFactory: (userRepository: DatabaseUserRepository) => new UseCaseProxy(new DeleteUserUseCases(userRepository)),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.GET_USERS_USECASES_PROXY,
          useFactory: (userRepository: DatabaseUserRepository) => new UseCaseProxy(new GetUsersUseCases(userRepository)),
        },
        {
          inject: [DatabaseUserRepository, BcryptService, MailService, DatabasePasswordTokenRepository],
          provide: UsecasesProxyModule.POST_USER_USECASES_PROXY,
          useFactory: (
            userRepository: DatabaseUserRepository,
            bcryptService: BcryptService,
            mailService: MailService,
            passwordTokenRepository: DatabasePasswordTokenRepository,
          ) => new UseCaseProxy(new AddUserUseCases(userRepository, passwordTokenRepository, bcryptService, mailService)),
        },
        {
          inject: [DatabaseGroupRepository],
          provide: UsecasesProxyModule.POST_GROUP_USECASES_PROXY,
          useFactory: (groupRepository: DatabaseGroupRepository) => new UseCaseProxy(new AddGroupUseCases(groupRepository)),
        },
        {
          inject: [DatabaseGroupRepository],
          provide: UsecasesProxyModule.GET_GROUPS_USECASES_PROXY,
          useFactory: (groupRepository: DatabaseGroupRepository) => new UseCaseProxy(new GetGroupsUseCases(groupRepository)),
        },
        {
          inject: [DatabaseGroupRepository],
          provide: UsecasesProxyModule.GET_GROUP_USECASES_PROXY,
          useFactory: (groupRepository: DatabaseGroupRepository) => new UseCaseProxy(new GetGroupUseCases(groupRepository)),
        },
        {
          inject: [DatabaseGroupRepository],
          provide: UsecasesProxyModule.EDIT_GROUP_ADMIN_USECASES_PROXY,
          useFactory: (groupRepository: DatabaseGroupRepository) => new UseCaseProxy(new EditGroupAdminUseCases(groupRepository)),
        },
        {
          inject: [DatabaseGroupRepository],
          provide: UsecasesProxyModule.ADD_GROUP_USER_USECASES_PROXY,
          useFactory: (groupRepository: DatabaseGroupRepository) => new UseCaseProxy(new AddGroupUserUseCases(groupRepository)),
        },
        {
          inject: [DatabaseTransactionRepository],
          provide: UsecasesProxyModule.GET_TRANSACTION_USECASES_PROXY,
          useFactory: (transactionRepository: TransactionRepository) =>
            new UseCaseProxy(new GetTransactionUseCases(transactionRepository)),
        },
        {
          inject: [DatabaseTransactionRepository],
          provide: UsecasesProxyModule.GET_TRANSACTIONS_USECASES_PROXY,
          useFactory: (transactionRepository: TransactionRepository) =>
            new UseCaseProxy(new GetTransactionsUseCases(transactionRepository)),
        },
        {
          inject: [DatabaseTransactionRepository, DatabaseZohoTokenRepository, ZohoSignService, EnvironmentConfigService],
          provide: UsecasesProxyModule.POST_TRANSACTION_USECASES_PROXY,
          useFactory: (
            transactionRepository: DatabaseTransactionRepository,
            zohoTokenRepository: DatabaseZohoTokenRepository,
            zohoSignService: ZohoSignService,
            config: EnvironmentConfigService,
          ) => new UseCaseProxy(new AddTransactionUseCases(transactionRepository, zohoTokenRepository, zohoSignService, config)),
        },
        {
          inject: [DatabaseTransactionRepository],
          provide: UsecasesProxyModule.EDIT_TRANSACTION_USECASES_PROXY,
          useFactory: (transactionRepository: DatabaseTransactionRepository) =>
            new UseCaseProxy(new UpdateTransactionUseCases(transactionRepository)),
        },
        {
          inject: [DatabaseTransactionRepository],
          provide: UsecasesProxyModule.DELETE_TRANSACTION_USECASES_PROXY,
          useFactory: (transactionRepository: DatabaseTransactionRepository) =>
            new UseCaseProxy(new DeleteTransactionUseCases(transactionRepository)),
        },
      ],
      exports: [
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
        UsecasesProxyModule.LOGOUT_USECASES_PROXY,
        UsecasesProxyModule.GET_USERS_USECASES_PROXY,
        UsecasesProxyModule.GET_USER_USECASES_PROXY,
        UsecasesProxyModule.POST_USER_USECASES_PROXY,
        UsecasesProxyModule.POST_GROUP_USECASES_PROXY,
        UsecasesProxyModule.GET_GROUPS_USECASES_PROXY,
        UsecasesProxyModule.GET_GROUP_USECASES_PROXY,
        UsecasesProxyModule.EDIT_GROUP_ADMIN_USECASES_PROXY,
        UsecasesProxyModule.ADD_GROUP_USER_USECASES_PROXY,
        UsecasesProxyModule.GET_TRANSACTION_USECASES_PROXY,
        UsecasesProxyModule.GET_TRANSACTIONS_USECASES_PROXY,
        UsecasesProxyModule.POST_TRANSACTION_USECASES_PROXY,
        UsecasesProxyModule.EDIT_TRANSACTION_USECASES_PROXY,
        UsecasesProxyModule.DELETE_TRANSACTION_USECASES_PROXY,
        UsecasesProxyModule.Delete_USER_USECASES_PROXY,
      ],
    };
  }
}
