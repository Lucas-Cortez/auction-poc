import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/core/abstracts/use-case';
import { AuctionRepository } from '../../domain/repositories/auction.repository';
import { Auction } from '../../domain/entities/auction';

export type GetAuctionsInput = void;
export type GetAuctionsOutput = { auctions: Auction[] };

@Injectable()
export class GetAuctionsUseCase implements IUseCase<GetAuctionsInput, GetAuctionsOutput> {
  constructor(private readonly auctionRepository: AuctionRepository) {}

  async execute(): Promise<GetAuctionsOutput> {
    const auctions = await this.auctionRepository.findAll({ include: ['car'] });

    return { auctions };
  }
}
