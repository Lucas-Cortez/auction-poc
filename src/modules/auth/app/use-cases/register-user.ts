import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IUseCase } from 'src/core/abstracts/use-case';
import { AuthenticateUserOutput } from './authenticate-user';
import { UserRepository } from 'src/modules/user/domain/repositories/user.repository';
import { UserRole } from 'src/modules/user/domain/enums/user-role';
import { HashingService } from 'src/modules/hashing/domain/services/hashing.service';
import { AuthenticateErrors } from '../../domain/enum/error-messages';

export type RegisterUserInput = { email: string; name: string; password: string };
export type RegisterUserOutput = AuthenticateUserOutput;

@Injectable()
export class RegisterUserUseCase implements IUseCase<RegisterUserInput, RegisterUserOutput> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
    const existingUser = await this.userRepository.findByEmail(input.email);

    if (existingUser) {
      throw new BadRequestException(AuthenticateErrors.ErrorTryingCreateUser);
    }

    const salt = await this.hashingService.generateSalt();
    const hashedPassword = await this.hashingService.hash(input.password, salt);

    const user = {
      email: input.email,
      name: input.name,
      password: hashedPassword,
      role: UserRole.USER,
    };

    const { userId } = await this.userRepository.create(user);

    const accessToken = this.jwtService.sign(
      { email: user.email, name: user.name, role: user.role },
      { subject: String(userId) },
    );

    return {
      token: accessToken,
      user: { email: user.email, name: user.name, userId: userId, role: user.role },
    };
  }
}
