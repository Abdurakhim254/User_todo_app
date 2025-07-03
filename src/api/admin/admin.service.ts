import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '@/common/prisma';
import { UserRoles } from '@prisma/client';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    const users = await this.prismaService.user.findMany({
      where: { role: UserRoles.USER },
    });

    if (users.length > 0) {
      return {
        message: 'Users found successfully',
        data: users,
      };
    }

    return {
      message: 'No users found',
      data: [],
    };
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      return {
        message: 'User not found',
        data: [],
      };
    }

    if (
      user.role === UserRoles.ADMIN 
    ) {
      throw new ForbiddenException('You cannot view another admin');
    }

    return {
      message: 'User found successfully',
      data: user,
    };
  }

  async update(id: number, dto: UpdateAdminDto) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      return {
        message: 'User not found',
        data: [],
      };
    }

    if (
      user.role === UserRoles.ADMIN
    ) {
      throw new ForbiddenException('You cannot update another admin');
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: dto,
    });

    return {
      message: 'User updated successfully',
      data: updatedUser,
    };
  }

  async remove(id: number) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      return {
        message: 'User not found',
        data: [],
      };
    }

    if (
      user.role === UserRoles.ADMIN 
    ) {
      throw new ForbiddenException('You cannot delete another admin');
    }

    const deletedUser = await this.prismaService.user.delete({
      where: { id },
    });

    return {
      message: 'User deleted successfully',
      data: deletedUser,
    };
  }
}
