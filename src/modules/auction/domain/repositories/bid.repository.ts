import { Bid, CreateBid } from '../entities/bid';

export abstract class BidRepository {
  abstract create(input: CreateBid): Promise<{ bidId: string }>;
  abstract findLastByAuction(auctionId: string): Promise<Bid | null>;
  abstract findAllByAuction(auctionId: string): Promise<Bid[]>;
}
