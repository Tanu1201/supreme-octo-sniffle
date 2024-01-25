import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionM } from 'src/domain/model/transaction';
import { UserM } from 'src/domain/model/user';
import { TransactionRepository } from 'src/domain/repositories/transactionRepository.interface';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';
import { UserGroup } from '../entities/userGroup.entity';

@Injectable()
export class DatabaseTransactionRepository implements TransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionEntityRepository: Repository<Transaction>,
    @InjectRepository(UserGroup)
    private readonly userGroupEntityRepository: Repository<UserGroup>,
  ) {}

  async createTransaction(text: string, groupId: string, user: UserM): Promise<TransactionM> {
    const groupUser = await this.userGroupEntityRepository.findOne({
      where: {
        groupId: groupId,
        userId: user.id,
      },
    });

    if (!groupUser) {
      throw new Error('User not found in this group!');
    }

    return await this.transactionEntityRepository
      .create({
        text: text,
        groupId: groupId,
        userId: user.id,
      })
      .save();
  }

  async getTransactions(userId?: string, groupId?: string): Promise<TransactionM[]> {
    console.log({ userId, groupId });
    return await this.transactionEntityRepository.find({
      where: {
        ...(userId && { userId }),
        ...(groupId && { groupId }),
      },
    });
  }

  async getTransaction(transactionId: string, userId?: string): Promise<TransactionM> {
    return await this.transactionEntityRepository.findOne({
      where: {
        id: transactionId,
        ...(userId && { userId }),
      },
    });
  }

  async deleteTransaction(transactionId: string, user: UserM): Promise<string> {
    const result = await this.transactionEntityRepository.delete({
      id: transactionId,
      userId: user.id,
    });
    if (result.affected === 0) {
      throw new Error('Transaction not found!');
    }
    return transactionId;
  }

  async updateTransaction(transactionId: string, text: string, user: UserM): Promise<TransactionM> {
    const transaction = await this.transactionEntityRepository.findOne({
      id: transactionId,
      userId: user.id,
    });
    transaction.text = text;

    return await transaction.save();
  }
}
