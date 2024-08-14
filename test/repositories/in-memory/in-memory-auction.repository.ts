import {
  CreateAuction,
  Auction,
  UpdateAuction,
  AuctionQueryOptions,
} from 'src/modules/auction/domain/entities/auction';
import { AuctionRepository } from 'src/modules/auction/domain/repositories/auction.repository';
import { randomUUID } from 'node:crypto';
import { AuctionStatus } from 'src/modules/auction/domain/enums/auction-status';

export class InMemoryAuctionRepository implements AuctionRepository {
  private auctions: Auction[] = [
    {
      auctionId: '4743453e-1faf-485a-b1bb-75ed5c40f356',
      carId: '023c0f2a-604f-468f-a16c-d7dac9780de0',
      startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      endDate: new Date(),
      status: AuctionStatus.CLOSED,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      auctionId: 'e4df4d6d-4241-4f3c-ade9-29bd89ce8d99',
      carId: '023c0f2a-604f-468f-a16c-d7dac9780de0',
      startDate: new Date(),
      endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      status: AuctionStatus.OPEN,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async create(auction: CreateAuction): Promise<{ auctionId: string }> {
    const newAuction: Auction = {
      ...auction,
      auctionId: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.auctions.push(newAuction);

    return { auctionId: newAuction.auctionId };
  }

  async findById(auctionId: string): Promise<Auction | null> {
    const auction = this.auctions.find((auction) => auction.auctionId === auctionId);

    if (!auction) return null;

    return auction;
  }

  async updateById(auctionId: string, auction: Partial<UpdateAuction>): Promise<void> {
    const auctionIndex = this.auctions.findIndex((auction) => auction.auctionId === auctionId);

    if (auctionIndex === -1) return;

    this.auctions[auctionIndex] = {
      ...this.auctions[auctionIndex],
      ...auction,
      updatedAt: new Date(),
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findAll(options?: AuctionQueryOptions): Promise<Auction[]> {
    const auctions = [...this.auctions];

    return auctions;
  }
}
