import { UserM } from 'src/domain/model/user';
import { TransactionRepository } from 'src/domain/repositories/transactionRepository.interface';

export class AddTransactionUseCases {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(text: string, groupId: string, user: UserM) {
    return await this.transactionRepository.createTransaction(text, groupId, user);
  }
}
