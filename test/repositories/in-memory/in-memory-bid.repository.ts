import { randomUUID } from 'node:crypto';
import { CreateBid, Bid } from 'src/modules/auction/domain/entities/bid';
import { BidRepository } from 'src/modules/auction/domain/repositories/bid.repository';

export class InMemoryBidRepository implements BidRepository {
  private bids: Bid[] = [
    {
      bidId: '5c302e99-9e6a-4cc1-b736-4fb44dcb9009',
      value: 30001,
      userId: '4e0524ec-107e-4b9f-b4f3-03c094e0cd8f',
      auctionId: 'e4df4d6d-4241-4f3c-ade9-29bd89ce8d99',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async create(input: CreateBid): Promise<{ bidId: string }> {
    const newBid: Bid = {
      ...input,
      bidId: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.bids.push(newBid);

    return { bidId: newBid.bidId };
  }

  async findLastByAuction(auctionId: string): Promise<Bid | null> {
    const bid = this.bids
      .filter((bid) => bid.auctionId === auctionId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];

    if (!bid) return null;

    return bid;
  }

  async findAllByAuction(auctionId: string): Promise<Bid[]> {
    const bids = this.bids.filter((bid) => bid.auctionId === auctionId);

    return bids;
  }
}
