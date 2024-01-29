import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddTransactionDto {
  @IsNotEmpty()
  @IsUUID()
  groupId: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
