import { Car } from 'src/modules/car/domain/entities/car';
import { AuctionStatus } from '../enums/auction-status';
import { Bid } from './bid';

export interface Auction {
  auctionId: string;
  status: AuctionStatus;
  startDate: Date;
  endDate: Date;
  carId: string;

  createdAt: Date;
  updatedAt: Date;

  car?: Car;
  bids?: Bid[];
}

export type CreateAuction = Omit<Auction, 'auctionId' | 'createdAt' | 'updatedAt' | 'car' | 'bids'>;

export type UpdateAuction = Pick<Auction, 'status' | 'startDate' | 'endDate'>;

export type AuctionQueryOptions = {
  include?: Array<'car' | 'bids'>;
};
