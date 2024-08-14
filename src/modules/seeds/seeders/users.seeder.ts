import { Injectable } from '@nestjs/common';
import { Seeder } from '../contracts/seeder';
import { CreateUser } from 'src/modules/user/domain/entities/user';
import { UserRole } from 'src/modules/user/domain/enums/user-role';
import { UserRepository } from 'src/modules/user/domain/repositories/user.repository';
import { HashingService } from 'src/modules/hashing/domain/services/hashing.service';

@Injectable()
export class UsersSeeder implements Seeder {
  constructor(
    protected readonly userRepository: UserRepository,
    private readonly hashingService: HashingService,
  ) {}

  private users: CreateUser[] = [
    {
      name: 'root',
      email: 'root@admin.com',
      password: 'Senha@123',
      role: UserRole.ADMIN,
    },
  ];

  public async execute(): Promise<void> {
    for (const user of this.users) {
      const existingUser = await this.userRepository.findByEmail(user.email);

      if (existingUser) continue;

      const salt = await this.hashingService.generateSalt();
      const hashedPassword = await this.hashingService.hash(user.password, salt);

      await this.userRepository.create({
        ...user,
        password: hashedPassword,
      });
    }
  }
}
