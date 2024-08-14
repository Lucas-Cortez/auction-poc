import { isUUID } from 'class-validator';
import { InMemoryAuctionRepository } from '../../../../../test/repositories/in-memory/in-memory-auction.repository';
import { InMemoryBidRepository } from '../../../../../test/repositories/in-memory/in-memory-bid.repository';
import { InMemoryCarRepository } from '../../../../../test/repositories/in-memory/in-memory-car.repository';
import { CreateAuctionBidInput, CreateAuctionBidUseCase } from './create-auction-bid';
import { AuctionErrors } from '../../domain/enums/error-messages';

const makeSut = () => {
  const auctionRepository = new InMemoryAuctionRepository();
  const bidRepository = new InMemoryBidRepository();
  const carRepository = new InMemoryCarRepository();

  const sut = new CreateAuctionBidUseCase(auctionRepository, bidRepository, carRepository);

  return { sut, auctionRepository, bidRepository, carRepository };
};

describe('CreateAuctionBidUseCase', () => {
  const { sut } = makeSut();

  it('should throw if not found auction', async () => {
    const input: CreateAuctionBidInput = {
      auctionId: 'not_exist',
      value: 0,
      userId: 'not_exist',
    };

    await expect(sut.execute(input)).rejects.toThrow(AuctionErrors.AuctionNotFound);
  });

  it('should throw if auction is closed', async () => {
    const input: CreateAuctionBidInput = {
      auctionId: '4743453e-1faf-485a-b1bb-75ed5c40f356',
      value: 0,
      userId: 'not_exist',
    };

    await expect(sut.execute(input)).rejects.toThrow(AuctionErrors.AuctionAlreadyFinished);
  });

  it('should throw if bid value is less than car minimum price', async () => {
    const input: CreateAuctionBidInput = {
      auctionId: 'e4df4d6d-4241-4f3c-ade9-29bd89ce8d99',
      value: 29999,
      userId: 'not_exist',
    };

    await expect(sut.execute(input)).rejects.toThrow(AuctionErrors.BidGreaterThanMinimumPrice);
  });

  it('should throw if bid value is less or equal than last bid', async () => {
    const input: CreateAuctionBidInput = {
      auctionId: 'e4df4d6d-4241-4f3c-ade9-29bd89ce8d99',
      value: 30001,
      userId: 'not_exist',
    };

    await expect(sut.execute(input)).rejects.toThrow(AuctionErrors.BidGreaterThanLastPrice);
  });

  it('should create the bid', async () => {
    const input: CreateAuctionBidInput = {
      auctionId: 'e4df4d6d-4241-4f3c-ade9-29bd89ce8d99',
      value: 30002,
      userId: '761aaa81-809a-4d53-87f6-d5070b64c638',
    };

    const output = await sut.execute(input);

    expect(isUUID(output.bidId)).toBeTruthy();
  });
});
