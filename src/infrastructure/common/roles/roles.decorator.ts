import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/domain/model/role.enum';

export const HasRoles = (...roles: Role[]) => SetMetadata('roles', roles);
