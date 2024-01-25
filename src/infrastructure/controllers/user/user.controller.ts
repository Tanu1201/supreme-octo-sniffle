import { Body, Controller, Get, Inject, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/domain/model/role.enum';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { RolesGuard } from 'src/infrastructure/common/guards/roles.guard';
import { HasRoles } from 'src/infrastructure/common/roles/roles.decorator';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { GetUserUseCases } from 'src/usecases/users/getUser.usecases';
import { AddUserDto } from './user.dto';
import { AddUserUseCases } from 'src/usecases/users/addUser.usecases';
import { GetUsersUseCases } from 'src/usecases/users/getUsers.usecases';

@Controller('users')
export class UserController {
  constructor(
    @Inject(UsecasesProxyModule.GET_USERS_USECASES_PROXY)
    private readonly getUsersUsecaseProxy: UseCaseProxy<GetUsersUseCases>,
    @Inject(UsecasesProxyModule.GET_USER_USECASES_PROXY)
    private readonly getUserUsecaseProxy: UseCaseProxy<GetUserUseCases>,
    @Inject(UsecasesProxyModule.POST_USER_USECASES_PROXY)
    private readonly addUserUsecaseProxy: UseCaseProxy<AddUserUseCases>,
  ) {}

  @HasRoles(Role.SUPERADMIN, Role.ADMIN, Role.POWERUSER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getUsers() {
    return await this.getUsersUsecaseProxy.getInstance().execute();
  }

  @HasRoles(Role.SUPERADMIN, Role.ADMIN, Role.POWERUSER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.getUserUsecaseProxy.getInstance().execute(id);
  }

  @HasRoles(Role.SUPERADMIN, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createUser(@Body() user: AddUserDto, @Req() req: any) {
    if (user.role === Role.SUPERADMIN) {
      throw new Error('You cannot create a superadmin');
    }
    if (req.user.role === Role.ADMIN) {
      if (![Role.POWERUSER, Role.USER].includes(user.role)) {
        throw new Error('You can only create a user or a poweruser');
      }
    } else if (req.user.role !== Role.SUPERADMIN) {
      throw new Error('You are not allowed to create a user');
    }
    return await this.addUserUsecaseProxy.getInstance().execute({ ...user, createdById: req.user.id });
  }
}
