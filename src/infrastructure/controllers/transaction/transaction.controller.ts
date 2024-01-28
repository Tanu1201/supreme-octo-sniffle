import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Role } from 'src/domain/model/role.enum';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { RolesGuard } from 'src/infrastructure/common/guards/roles.guard';
import { HasRoles } from 'src/infrastructure/common/roles/roles.decorator';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { AddTransactionUseCases } from 'src/usecases/transaction/addTransaction.usecases';
import { DeleteTransactionUseCases } from 'src/usecases/transaction/deleteTransaction.usecases';
import { GetTransactionUseCases } from 'src/usecases/transaction/getTransaction.usecases';
import { GetTransactionsUseCases } from 'src/usecases/transaction/getTransactions.usecases';
import { UpdateTransactionUseCases } from 'src/usecases/transaction/updateTransaction.usecases';
import { AddTransactionDto } from './transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(
    @Inject(UsecasesProxyModule.GET_TRANSACTION_USECASES_PROXY)
    private readonly getTransactionUsecaseProxy: UseCaseProxy<GetTransactionUseCases>,
    @Inject(UsecasesProxyModule.GET_TRANSACTIONS_USECASES_PROXY)
    private readonly getTransactionsUsecaseProxy: UseCaseProxy<GetTransactionsUseCases>,
    @Inject(UsecasesProxyModule.POST_TRANSACTION_USECASES_PROXY)
    private readonly addTransactionUsecaseproxy: UseCaseProxy<AddTransactionUseCases>,
    @Inject(UsecasesProxyModule.EDIT_TRANSACTION_USECASES_PROXY)
    private readonly updateTransactionUsecaseProxy: UseCaseProxy<UpdateTransactionUseCases>,
    @Inject(UsecasesProxyModule.DELETE_TRANSACTION_USECASES_PROXY)
    private readonly deleteTransactionUsecaseProxy: UseCaseProxy<DeleteTransactionUseCases>,
  ) {}

  @HasRoles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/files',
        filename: (req, file, cb) => {
          const fileName = `${Date.now()}-${file.originalname}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  @Post()
  async createTransaction(
    @Body() { groupId, name, email }: AddTransactionDto,
    @Req() req: any,
    @UploadedFile('file')
    file: Express.Multer.File,
  ) {
    return await this.addTransactionUsecaseproxy.getInstance().execute(file.path, groupId, req.user, name, email);
  }

  @HasRoles(Role.SUPPORTDESK, Role.USER, Role.ADMIN, Role.SUPERADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getTransactions(@Req() req: any, @Query('userId') userId?: string, @Query('groupId') groupId?: string) {
    if (req.user.role === Role.USER) {
      if (userId && req.user.id !== userId) {
        throw new Error("You don't have access for this user!");
      } else {
        userId = req.user.id;
      }
    }

    return await this.getTransactionsUsecaseProxy.getInstance().execute(req.user, userId, groupId);
  }

  @HasRoles(Role.SUPPORTDESK, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async getTransaction(@Req() req: any, @Param('id') id: string) {
    return await this.getTransactionUsecaseProxy.getInstance().execute(id, req.user.role === Role.USER ? req.user.id : undefined);
  }

  @HasRoles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async updateTransaction(@Req() req: any, @Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return await this.updateTransactionUsecaseProxy.getInstance().execute(id, file.path, req.user);
  }

  @HasRoles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteTransaction(@Req() req: any, @Param('id') id: string) {
    return await this.deleteTransactionUsecaseProxy.getInstance().execute(id, req.user);
  }
}
