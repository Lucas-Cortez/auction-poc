import { forwardRef, Module } from '@nestjs/common';
import { CarController } from './app/controllers/car.controller';
import { RegisterCarUseCase } from './app/use-cases/register-car';
import { CarRepository } from './domain/repositories/car.repository';
import { PrismaCarRepository } from './infra/repositories/prisma-car.repository';
import { AuctionModule } from '../auction/auction.module';

@Module({
  imports: [forwardRef(() => AuctionModule)],
  controllers: [CarController],
  providers: [RegisterCarUseCase, { provide: CarRepository, useClass: PrismaCarRepository }],
  exports: [CarRepository],
})
export class CarModule {}
