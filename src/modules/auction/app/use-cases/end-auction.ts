import { BadRequestException, Injectable } from '@nestjs/common';

import { IUseCase } from 'src/core/abstracts/use-case';
import { AuctionRepository } from '../../domain/repositories/auction.repository';
import { AuctionStatus } from '../../domain/enums/auction-status';
import { BidRepository } from '../../domain/repositories/bid.repository';
import { CarRepository } from 'src/modules/car/domain/repositories/car.repository';
import { Car } from 'src/modules/car/domain/entities/car';
import { Bid } from '../../domain/entities/bid';
import { UserRepository } from 'src/modules/user/domain/repositories/user.repository';
import { SecureUser } from 'src/modules/user/domain/entities/user';
import { AuctionErrors } from '../../domain/enums/error-messages';

export type EndAuctionInput = { auctionId: string };
export type EndAuctionOutput = { bid: Bid; car: Car; winner: SecureUser };

@Injectable()
export class EndAuctionUseCase implements IUseCase<EndAuctionInput, EndAuctionOutput> {
  constructor(
    private readonly auctionRepository: AuctionRepository,
    private readonly bidRepository: BidRepository,
    private readonly carRepository: CarRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: EndAuctionInput): Promise<EndAuctionOutput> {
    const auction = await this.auctionRepository.findById(input.auctionId);

    if (!auction) {
      throw new BadRequestException(AuctionErrors.AuctionNotFound);
    }

    if (auction.status !== AuctionStatus.OPEN) {
      throw new BadRequestException(AuctionErrors.AuctionAlreadyFinished);
    }

    const lastBid = await this.bidRepository.findLastByAuction(input.auctionId);

    if (!lastBid) {
      throw new BadRequestException(AuctionErrors.AuctionHasNoBidsToFinish);
    }

    await this.auctionRepository.updateById(input.auctionId, { status: AuctionStatus.CLOSED });

    const [car, userWinner] = await Promise.all([
      this.carRepository.findById(auction.carId) as Promise<Car>,
      this.userRepository.findById(lastBid.userId) as Promise<SecureUser>,
    ]);

    return {
      bid: lastBid,
      car,
      winner: userWinner,
    };
  }
}
