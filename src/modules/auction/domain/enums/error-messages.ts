export enum AuctionErrors {
  AuctionAlreadyExists = 'auction-already-exists',
  AuctionNotFound = 'auction-not-found',
  AuctionAlreadyFinished = 'auction-already-finished',
  BidGreaterThanMinimumPrice = 'bid-greater-than-minimum-price',
  BidGreaterThanLastPrice = 'bid-greater-than-last-price',
  AuctionHasNoBidsToFinish = 'auction-has-no-bids-to-finish',
}
