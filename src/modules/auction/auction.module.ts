import { forwardRef, Module } from '@nestjs/common';
import { AuctionController } from './app/controllers/auction.controller';
import { CreateAuctionBidUseCase } from './app/use-cases/create-auction-bid';
import { EndAuctionUseCase } from './app/use-cases/end-auction';
import { GetAuctionBidsUseCase } from './app/use-cases/get-auction-bids';
import { GetAuctionsUseCase } from './app/use-cases/get-auctions';
import { AuctionRepository } from './domain/repositories/auction.repository';
import { PrismaAuctionRepository } from './infra/repositories/prisma-auction.repository';
import { BidRepository } from './domain/repositories/bid.repository';
import { CarModule } from '../car/car.module';
import { UserModule } from '../user/user.module';
import { PrismaBidRepository } from './infra/repositories/prisma-bid.repository';

@Module({
  imports: [forwardRef(() => CarModule), UserModule],
  controllers: [AuctionController],
  providers: [
    { provide: AuctionRepository, useClass: PrismaAuctionRepository },
    { provide: BidRepository, useClass: PrismaBidRepository },
    CreateAuctionBidUseCase,
    EndAuctionUseCase,
    GetAuctionBidsUseCase,
    GetAuctionsUseCase,
  ],
  exports: [AuctionRepository, BidRepository],
})
export class AuctionModule {}
