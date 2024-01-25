import { UserM } from 'src/domain/model/user';
import { TransactionRepository } from 'src/domain/repositories/transactionRepository.interface';

export class UpdateTransactionUseCases {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(transactionId: string, text: string, user: UserM) {
    return await this.transactionRepository.updateTransaction(transactionId, text, user);
  }
}
