import { UserM } from 'src/domain/model/user';
import { TransactionRepository } from 'src/domain/repositories/transactionRepository.interface';

export class GetTransactionUseCases {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(transactionId: string, userId?: string) {
    return await this.transactionRepository.getTransaction(transactionId, userId);
  }
}
