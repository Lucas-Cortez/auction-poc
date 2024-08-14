import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterCarUseCase } from '../use-cases/register-car';
import { CurrentUser } from 'src/modules/auth/app/decorators/current-user.decorator';
import { DecodedUserToken } from 'src/modules/auth/domain/entities/decoded-user-token';
import { RegisterCarDto } from '../dtos/register-car.dto';
import { ProtectedRoute } from 'src/modules/auth/app/decorators/protected-route.decorator';

@ApiTags('Car')
@Controller('car')
export class CarController {
  constructor(private readonly registerCarUseCase: RegisterCarUseCase) {}

  @ApiOperation({ summary: 'Register a car to start an auction' })
  @ProtectedRoute()
  @Post('/')
  registerCar(@CurrentUser() user: DecodedUserToken, @Body() body: RegisterCarDto) {
    return this.registerCarUseCase.execute({ ownerId: user.id, ...body });
  }
}
