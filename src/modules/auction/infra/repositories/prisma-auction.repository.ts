import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/database/infra/prisma/prisma.service';
import { AuctionRepository } from '../../domain/repositories/auction.repository';
import { CreateAuction, Auction, UpdateAuction, AuctionQueryOptions } from '../../domain/entities/auction';
import { AuctionStatus } from '../../domain/enums/auction-status';

@Injectable()
export class PrismaAuctionRepository implements AuctionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(auction: CreateAuction): Promise<{ auctionId: string }> {
    const { auctionId } = await this.prismaService.auction.create({
      data: {
        startDate: auction.startDate,
        endDate: auction.endDate,
        status: auction.status,
        carId: auction.carId,
      },
    });

    return { auctionId };
  }

  async findById(auctionId: string): Promise<Auction | null> {
    const auction = await this.prismaService.auction.findUnique({
      where: { auctionId },
    });

    if (!auction) return null;

    return { ...auction, status: auction.status as AuctionStatus };
  }

  async updateById(auctionId: string, auction: Partial<UpdateAuction>): Promise<void> {
    await this.prismaService.auction.update({
      where: { auctionId },
      data: { ...auction },
    });
  }

  async findAll(options?: AuctionQueryOptions): Promise<Auction[]> {
    const includes = options?.include
      ? options.include.reduce((acc, key) => ({ ...acc, [key]: true }), {} as Record<string, boolean>)
      : {};

    const auctions = await this.prismaService.auction.findMany({
      include: { ...includes },
      where: { status: AuctionStatus.OPEN },
    });

    return auctions as Auction[];
  }
}
