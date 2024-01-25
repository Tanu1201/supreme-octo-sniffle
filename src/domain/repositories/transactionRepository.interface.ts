import { TransactionM } from '../model/transaction';
import { UserM } from '../model/user';

export interface TransactionRepository {
  createTransaction(text: string, groupId: string, user: UserM): Promise<TransactionM>;

  getTransactions(userId?: string, groupId?: string): Promise<TransactionM[]>;

  getTransaction(transactionId: string, userId?: string): Promise<TransactionM>;

  deleteTransaction(transactionId: string, user: UserM): Promise<string>;

  updateTransaction(transactionId: string, text: string, user: UserM): Promise<TransactionM>;
}
