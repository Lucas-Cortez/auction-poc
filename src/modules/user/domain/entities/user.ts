import { UserRole } from '../enums/user-role';

export interface User {
  userId: string;
  email: string;
  name: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type SecureUser = Omit<User, 'password'>;

export type CreateUser = Omit<User, 'userId' | 'createdAt' | 'updatedAt'>;
