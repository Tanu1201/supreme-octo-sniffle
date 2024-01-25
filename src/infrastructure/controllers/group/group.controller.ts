import { Body, Controller, Get, Inject, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Role } from 'src/domain/model/role.enum';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { RolesGuard } from 'src/infrastructure/common/guards/roles.guard';
import { HasRoles } from 'src/infrastructure/common/roles/roles.decorator';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { AddGroupUseCases } from 'src/usecases/group/addGroup.usecases';
import { GetGroupUseCases } from 'src/usecases/group/getGroup.usecases';
import { GetGroupsUseCases } from 'src/usecases/group/getGroups.usecases';
import { AddGroupUserDto, CreateGroupDto, EditGroupAdminDto } from './group.dto';
import { EditGroupAdminUseCases } from 'src/usecases/group/editGroup.usecases';
import { AddGroupUserUseCases } from 'src/usecases/group/addGroupUser.usecases';

@Controller('groups')
export class GroupController {
  constructor(
    @Inject(UsecasesProxyModule.POST_GROUP_USECASES_PROXY) private readonly addGroupUsecaseProxy: UseCaseProxy<AddGroupUseCases>,
    @Inject(UsecasesProxyModule.GET_GROUPS_USECASES_PROXY)
    private readonly getGroupsUsecaseProxy: UseCaseProxy<GetGroupsUseCases>,
    @Inject(UsecasesProxyModule.GET_GROUP_USECASES_PROXY)
    private readonly getGroupUsecaseProxy: UseCaseProxy<GetGroupUseCases>,
    @Inject(UsecasesProxyModule.EDIT_GROUP_ADMIN_USECASES_PROXY)
    private readonly editGroupAdminUsecaseProxy: UseCaseProxy<EditGroupAdminUseCases>,
    @Inject(UsecasesProxyModule.ADD_GROUP_USER_USECASES_PROXY)
    private readonly addGroupUserUsecaseProxy: UseCaseProxy<AddGroupUserUseCases>,
  ) {}

  @HasRoles(Role.SUPERADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createGroup(@Body() body: CreateGroupDto) {
    return await this.addGroupUsecaseProxy.getInstance().execute(body.name, body.adminId);
  }

  @HasRoles(Role.SUPERADMIN, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getGroups(@Req() req: any) {
    return await this.getGroupsUsecaseProxy.getInstance().execute(req.user);
  }

  @HasRoles(Role.SUPERADMIN, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async getGroup(@Param('id') id: string, @Req() req: any) {
    return await this.getGroupUsecaseProxy.getInstance().execute(id, req.user);
  }

  @HasRoles(Role.SUPERADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async editGroupAdmin(@Param('id') id: string, @Body() body: EditGroupAdminDto, @Req() req: any) {
    return await this.editGroupAdminUsecaseProxy.getInstance().execute(id, body.adminId);
  }

  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('users')
  async addUserToGroup(@Body() body: AddGroupUserDto, @Req() req: any) {
    return await this.addGroupUserUsecaseProxy.getInstance().execute(body.groupId, body.userId, req.user);
  }
}
