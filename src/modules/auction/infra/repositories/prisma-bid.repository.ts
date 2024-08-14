import { Injectable } from '@nestjs/common';
import { BidRepository } from '../../domain/repositories/bid.repository';
import { PrismaService } from 'src/modules/database/infra/prisma/prisma.service';
import { Bid, CreateBid } from '../../domain/entities/bid';

@Injectable()
export class PrismaBidRepository implements BidRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(input: CreateBid): Promise<{ bidId: string }> {
    const { bidId } = await this.prismaService.bid.create({
      data: {
        value: input.value,
        userId: input.userId,
        auctionId: input.auctionId,
      },
    });

    return { bidId };
  }

  async findLastByAuction(auctionId: string): Promise<Bid | null> {
    const bid = await this.prismaService.bid.findFirst({
      where: { auctionId },
      orderBy: { createdAt: 'desc' },
    });

    return bid;
  }

  async findAllByAuction(auctionId: string): Promise<Bid[]> {
    const bids = await this.prismaService.bid.findMany({
      where: { auctionId },
      orderBy: { createdAt: 'desc' },
    });

    return bids;
  }
}
