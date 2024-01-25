import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { UserGroup } from './userGroup.entity';
import { Transaction } from './transaction.entity';

@Entity()
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  adminId?: string;

  @ManyToOne(() => User, (user) => user.adminGroups, { nullable: true })
  admin?: User;

  @OneToMany(() => UserGroup, (userGroup) => userGroup.group, { nullable: true })
  groupUsers?: UserGroup[];

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.group, { nullable: true })
  transactions?: Transaction[];
}
