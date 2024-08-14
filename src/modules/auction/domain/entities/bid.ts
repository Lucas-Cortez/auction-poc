export interface Bid {
  bidId: string;
  value: number;
  userId: string;
  auctionId: string;

  createdAt: Date;
  updatedAt: Date;
}

export type CreateBid = Omit<Bid, 'bidId' | 'createdAt' | 'updatedAt'>;
