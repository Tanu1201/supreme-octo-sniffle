import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  adminId?: string;
}

export class EditGroupAdminDto {
  @IsNotEmpty()
  @IsString()
  adminId: string;
}

export class AddGroupUserDto {
  @IsNotEmpty()
  @IsString()
  groupId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
