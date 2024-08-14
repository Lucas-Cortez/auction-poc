import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './app/strategies/jwt.strategy';
import { AuthController } from './app/controllers/auth.controller';
import { Environment } from '../global/domain/services/env.service';
import { UserModule } from '../user/user.module';
import { HashingModule } from '../hashing/hashing.module';
import { AuthenticateUserUseCase } from './app/use-cases/authenticate-user';
import { RegisterUserUseCase } from './app/use-cases/register-user';

@Module({
  imports: [
    HashingModule,
    UserModule,
    JwtModule.registerAsync({
      useFactory: (environment: Environment) => ({
        secret: environment.JWT_SECRET,
        signOptions: { expiresIn: '1d' },
      }),
      inject: [Environment],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthenticateUserUseCase, RegisterUserUseCase, JwtStrategy],
})
export class AuthModule {}
