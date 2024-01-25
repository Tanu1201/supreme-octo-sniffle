import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AddTransactionDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsUUID()
  groupId: string;
}

export class UpdateTransactionDto {
  @IsNotEmpty()
  @IsString()
  text: string;
}
