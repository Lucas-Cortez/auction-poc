import { BadRequestException, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/core/abstracts/use-case';
import { AuctionRepository } from '../../domain/repositories/auction.repository';
import { CreateBid } from '../../domain/entities/bid';
import { BidRepository } from '../../domain/repositories/bid.repository';
import { AuctionStatus } from '../../domain/enums/auction-status';
import { CarRepository } from 'src/modules/car/domain/repositories/car.repository';
import { Car } from 'src/modules/car/domain/entities/car';
import { AuctionErrors } from '../../domain/enums/error-messages';

export type CreateAuctionBidInput = CreateBid;
export type CreateAuctionBidOutput = { bidId: string };

@Injectable()
export class CreateAuctionBidUseCase implements IUseCase<CreateAuctionBidInput, CreateAuctionBidOutput> {
  constructor(
    private readonly auctionRepository: AuctionRepository,
    private readonly bidRepository: BidRepository,
    private readonly carRepository: CarRepository,
  ) {}

  async execute(input: CreateAuctionBidInput): Promise<CreateAuctionBidOutput> {
    const auction = await this.auctionRepository.findById(input.auctionId);

    if (!auction) {
      throw new BadRequestException(AuctionErrors.AuctionNotFound);
    }

    if (auction.status !== AuctionStatus.OPEN) {
      throw new BadRequestException(AuctionErrors.AuctionAlreadyFinished);
    }

    const car = (await this.carRepository.findById(auction.carId)) as Car;

    if (car.minimumPrice > input.value) {
      throw new BadRequestException(AuctionErrors.BidGreaterThanMinimumPrice);
    }

    const lastBid = await this.bidRepository.findLastByAuction(input.auctionId);

    if (lastBid && lastBid.value >= input.value) {
      throw new BadRequestException(AuctionErrors.BidGreaterThanLastPrice);
    }

    const { bidId } = await this.bidRepository.create({
      value: input.value,
      userId: input.userId,
      auctionId: input.auctionId,
    });

    return { bidId };
  }
}
