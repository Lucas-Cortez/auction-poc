import { BadRequestException, Injectable } from '@nestjs/common';

import { IUseCase } from 'src/core/abstracts/use-case';
import { CarRepository } from '../../domain/repositories/car.repository';
import { CreateCar } from '../../domain/entities/car';
import { AuctionRepository } from 'src/modules/auction/domain/repositories/auction.repository';
import { AuctionStatus } from 'src/modules/auction/domain/enums/auction-status';
import { CarErrors } from '../../domain/enums/error-messages';

const AUCTION_DURATION = 1000 * 60 * 60 * 24 * 7; // 7 days

export type RegisterCarInput = CreateCar;
export type RegisterCarOutput = { carId: string; auctionId: string };

@Injectable()
export class RegisterCarUseCase implements IUseCase<RegisterCarInput, RegisterCarOutput> {
  constructor(
    private readonly carRepository: CarRepository,
    private readonly auctionRepository: AuctionRepository,
  ) {}

  async execute(input: RegisterCarInput): Promise<RegisterCarOutput> {
    const existingCar = await this.carRepository.findBylicense(input.license);

    if (existingCar) {
      throw new BadRequestException(CarErrors.CarAlreadyExists);
    }

    const { carId } = await this.carRepository.create(input);

    const { auctionId } = await this.auctionRepository.create({
      carId,
      startDate: new Date(),
      endDate: new Date(Date.now() + AUCTION_DURATION),
      status: AuctionStatus.OPEN,
    });

    return { carId, auctionId };
  }
}
