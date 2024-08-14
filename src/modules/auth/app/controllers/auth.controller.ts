import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthenticateUserDto } from '../dtos/authenticate-user.dto';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { AuthenticateUserUseCase } from '../use-cases/authenticate-user';
import { RegisterUserUseCase } from '../use-cases/register-user';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
  ) {}

  @ApiOperation({ summary: 'Authenticate an user' })
  @Post('/')
  authenticate(@Body() body: AuthenticateUserDto) {
    return this.authenticateUserUseCase.execute({ email: body.email, password: body.password });
  }

  @ApiOperation({ summary: 'Register a new user' })
  @Post('/register')
  register(@Body() body: RegisterUserDto) {
    return this.registerUserUseCase.execute({ ...body });
  }
}
