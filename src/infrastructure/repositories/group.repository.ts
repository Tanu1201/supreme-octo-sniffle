import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupRepository } from 'src/domain/repositories/groupRepository.interface';
import { Group } from '../entities/group.entity';
import { GroupM, GroupWithUsersM } from 'src/domain/model/group';
import { UserM } from 'src/domain/model/user';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Role } from 'src/domain/model/role.enum';
import { UserGroup } from '../entities/userGroup.entity';

@Injectable()
export class DatabaseGroupRepository implements GroupRepository {
  constructor(
    @InjectRepository(Group)
    private readonly groupEntityRepository: Repository<Group>,
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
    @InjectRepository(UserGroup)
    private readonly userGroupEntityRepository: Repository<UserGroup>,
  ) {}

  async createGroup(name: string, adminId?: string): Promise<GroupM> {
    return await this.groupEntityRepository.create({ name, adminId }).save();
  }

  async getGroups(user: UserM): Promise<GroupM[]> {
    return await this.groupEntityRepository.find({
      ...(user.role !== Role.SUPERADMIN && { where: { adminId: user.id } }),
    });
  }

  async getGroupById(id: string, user: UserM): Promise<GroupWithUsersM> {
    const group = await this.groupEntityRepository.findOne({
      where: { id, ...(user.role !== Role.SUPERADMIN && { adminId: user.id }) },
      relations: ['groupUsers', 'groupUsers.user', 'admin'],
    });

    if (!group) {
      throw new Error('Group not found');
    }

    const response = {
      ...group,
      admin: {
        ...group.admin,
        password: undefined,
        refreshToken: undefined,
      },
      groupUsers: group.groupUsers?.map((userGroup) => ({
        ...userGroup.user,
        password: undefined,
        refreshToken: undefined,
      })),
    };

    return response;
  }

  async editGroupAdmin(groupId: string, adminId: string): Promise<GroupM> {
    const adminValid = await this.userEntityRepository.findOne({
      where: {
        id: adminId,
        role: Role.ADMIN,
      },
    });

    if (!adminValid) {
      throw new Error('Admin not found or not correct role');
    }

    const group = await this.groupEntityRepository.findOne({
      where: { id: groupId },
    });

    if (!group) {
      throw new Error('Group not found');
    }

    group.adminId = adminId;

    return await group.save();
  }

  async addUserToGroup(groupId: string, userId: string, loggedInUser: UserM): Promise<string> {
    const group = await this.groupEntityRepository.findOne({
      where: {
        id: groupId,
        ...(loggedInUser.role !== Role.SUPERADMIN && {
          adminId: loggedInUser.id,
        }),
      },
    });

    if (!group) {
      throw new Error('Group not found or not enough permission for this operation!');
    }
    const alreadyExists = await this.userGroupEntityRepository.findOne({
      where: {
        groupId,
        userId,
      },
    });
    if (alreadyExists) {
      throw new Error('User already exists in the group');
    }
    await this.userGroupEntityRepository
      .create({
        groupId,
        userId,
      })
      .save();

    return 'User added successfully!';
  }

  getGroupUsers(groupId: string): Promise<UserM[]> {
    throw new Error('Method not implemented.');
  }
}
