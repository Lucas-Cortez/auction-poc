import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUseCase } from 'src/core/abstracts/use-case';
import { HashingService } from 'src/modules/hashing/domain/services/hashing.service';
import { wrapPassword } from '../utils/wrap-password';
import { AuthenticateErrors } from '../../domain/enum/error-messages';
import { UserRepository } from 'src/modules/user/domain/repositories/user.repository';
import { UserRole } from 'src/modules/user/domain/enums/user-role';

export type AuthenticateUserInput = { email: string; password: string };
export type AuthenticateUserOutput = {
  token: string;
  user: { email: string; name: string; userId: string; role: UserRole };
};

@Injectable()
export class AuthenticateUserUseCase implements IUseCase<AuthenticateUserInput, AuthenticateUserOutput> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: AuthenticateUserInput): Promise<AuthenticateUserOutput> {
    const user = await this.userRepository.findByEmail(input.email);

    const encryptedPassword = wrapPassword(user?.password);

    const isPasswordCorrect = await this.hashingService.compare(input.password, encryptedPassword);

    if (!user || !isPasswordCorrect) {
      throw new UnauthorizedException(AuthenticateErrors.InvalidCredentials);
    }

    const accessToken = this.jwtService.sign(
      { email: user.email, name: user.name, role: user.role },
      { subject: String(user.userId) },
    );

    return {
      token: accessToken,
      user: { email: user.email, name: user.name, userId: user.userId, role: user.role },
    };
  }
}
