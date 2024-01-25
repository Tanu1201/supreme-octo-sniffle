import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/domain/model/role.enum';

export class IsAuthPresenter {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  role: Role;
}
