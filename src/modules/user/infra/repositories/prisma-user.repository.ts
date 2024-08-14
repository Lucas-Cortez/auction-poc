import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { PrismaService } from 'src/modules/database/infra/prisma/prisma.service';
import { CreateUser, SecureUser, User } from '../../domain/entities/user';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return { ...user, role: user.role as User['role'] };
  }

  async create(user: CreateUser): Promise<{ userId: string }> {
    const { userId } = await this.prismaService.user.create({
      data: { ...user },
      select: { userId: true },
    });

    return { userId };
  }

  async findById(userId: string): Promise<SecureUser | null> {
    const user = await this.prismaService.user.findUnique({
      where: { userId },
    });

    if (!user) return null;

    return { ...user, role: user.role as User['role'] };
  }
}
