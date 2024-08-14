import { BadRequestException, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/core/abstracts/use-case';
import { AuctionRepository } from '../../domain/repositories/auction.repository';
import { BidRepository } from '../../domain/repositories/bid.repository';
import { Bid } from '../../domain/entities/bid';
import { AuctionErrors } from '../../domain/enums/error-messages';

export type GetAuctionBidsInput = { auctionId: string };
export type GetAuctionBidsOutput = { bids: Bid[] };

@Injectable()
export class GetAuctionBidsUseCase implements IUseCase<GetAuctionBidsInput, GetAuctionBidsOutput> {
  constructor(
    private readonly auctionRepository: AuctionRepository,
    private readonly bidRepository: BidRepository,
  ) {}

  async execute(input: GetAuctionBidsInput): Promise<GetAuctionBidsOutput> {
    const auction = await this.auctionRepository.findById(input.auctionId);

    if (!auction) {
      throw new BadRequestException(AuctionErrors.AuctionNotFound);
    }

    const bids = await this.bidRepository.findAllByAuction(input.auctionId);

    return { bids };
  }
}
