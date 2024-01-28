import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'zohoTokens' })
export class ZohoToken extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  accessToken: string;

  @Column()
  expiresIn: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;
}
