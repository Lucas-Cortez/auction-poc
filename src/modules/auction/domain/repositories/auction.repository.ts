import { Auction, AuctionQueryOptions, CreateAuction, UpdateAuction } from '../entities/auction';

export abstract class AuctionRepository {
  abstract create(auction: CreateAuction): Promise<{ auctionId: string }>;
  abstract findById(auctionId: string): Promise<Auction | null>;
  abstract updateById(auctionId: string, auction: Partial<UpdateAuction>): Promise<void>;
  abstract findAll(options?: AuctionQueryOptions): Promise<Auction[]>;
}
