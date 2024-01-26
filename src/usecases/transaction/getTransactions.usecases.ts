import { UserM } from 'src/domain/model/user';
import { TransactionRepository } from 'src/domain/repositories/transactionRepository.interface';

export class GetTransactionsUseCases {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(user: UserM, userId?: string, groupId?: string) {
    return await this.transactionRepository.getTransactions(user, userId, groupId);
  }
}
