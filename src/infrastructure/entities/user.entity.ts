import { Role } from 'src/domain/model/role.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Group } from './group.entity';
import { UserGroup } from './userGroup.entity';
import { Transaction } from './transaction.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ enum: Role })
  role: Role;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @Column({ nullable: true })
  refreshToken?: string;

  @Column({ type: 'uuid', nullable: true })
  createdById?: string;

  //? CreatedBy JOIN
  @ManyToOne(() => User, (user) => user.createdUsers, { nullable: true })
  createdBy?: User;

  @OneToMany(() => User, (user) => user.createdBy, { nullable: true })
  createdUsers?: User[];

  //? Group ADMIN JOIN
  @OneToMany(() => Group, (group) => group.admin, { nullable: true })
  adminGroups?: Group[];

  //? Group USER JOIN
  @OneToMany(() => UserGroup, (userGroup) => userGroup.user, { nullable: true })
  userGroups?: UserGroup[];

  //? Transaction Join
  @OneToMany(() => Transaction, (transaction) => transaction.user, { nullable: true })
  transactions?: Transaction[];
}
