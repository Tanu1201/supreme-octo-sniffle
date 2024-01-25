import { UserM } from 'src/domain/model/user';
import { TransactionRepository } from 'src/domain/repositories/transactionRepository.interface';

export class DeleteTransactionUseCases {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(transactionId: string, user: UserM) {
    return await this.transactionRepository.deleteTransaction(transactionId, user);
  }
}
