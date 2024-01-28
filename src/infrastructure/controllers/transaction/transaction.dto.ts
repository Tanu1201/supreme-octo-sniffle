import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AddTransactionDto {
  @IsNotEmpty()
  @IsUUID()
  groupId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
