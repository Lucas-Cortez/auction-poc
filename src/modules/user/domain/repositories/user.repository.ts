import { CreateUser, SecureUser, User } from '../entities/user';

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(user: CreateUser): Promise<{ userId: string }>;
  abstract findById(userId: string): Promise<SecureUser | null>;
}
