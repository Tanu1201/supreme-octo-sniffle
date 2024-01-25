import { TransactionRepository } from 'src/domain/repositories/transactionRepository.interface';

export class GetTransactionsUseCases {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(userId?: string, groupId?: string) {
    return await this.transactionRepository.getTransactions(userId, groupId);
  }
}
