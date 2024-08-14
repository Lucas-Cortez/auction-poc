import { randomUUID } from 'node:crypto';
import { User, CreateUser, SecureUser } from 'src/modules/user/domain/entities/user';
import { UserRole } from 'src/modules/user/domain/enums/user-role';
import { UserRepository } from 'src/modules/user/domain/repositories/user.repository';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [
    {
      userId: '4e0524ec-107e-4b9f-b4f3-03c094e0cd8f',
      email: 'john@doe.com',
      name: 'John Doe',
      password: '$2b$10$ZO9fogzE1ZsZj5/Zb.WPJuVmYTgIB7pbX9GOpNdq0d8ZBMkOkzGta', // Senha@123
      role: UserRole.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: '761aaa81-809a-4d53-87f6-d5070b64c638',
      email: 'jane@doe.com',
      name: 'Jane Doe',
      password: '$2b$10$ZO9fogzE1ZsZj5/Zb.WPJuVmYTgIB7pbX9GOpNdq0d8ZBMkOkzGta', // Senha@123
      role: UserRole.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    if (!user) return null;

    return user;
  }

  async create(user: CreateUser): Promise<{ userId: string }> {
    const newUser: User = {
      ...user,
      userId: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);

    return { userId: newUser.userId };
  }

  async findById(userId: string): Promise<SecureUser | null> {
    const user = this.users.find((user) => user.userId === userId);

    if (!user) return null;

    return { ...user, role: user.role as User['role'] };
  }
}
