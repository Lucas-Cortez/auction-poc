import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetAuctionsUseCase } from '../use-cases/get-auctions';
import { CreateAuctionBidUseCase } from '../use-cases/create-auction-bid';
import { EndAuctionUseCase } from '../use-cases/end-auction';
import { GetAuctionBidsUseCase } from '../use-cases/get-auction-bids';
import { CreateAuctionBidDto } from '../dtos/create-auction-bid.dto';
import { DecodedUserToken } from 'src/modules/auth/domain/entities/decoded-user-token';
import { CurrentUser } from 'src/modules/auth/app/decorators/current-user.decorator';
import { ProtectedRoute } from 'src/modules/auth/app/decorators/protected-route.decorator';
import { UserRole } from 'src/modules/user/domain/enums/user-role';
import { ApplyRoleGuard } from 'src/modules/auth/app/decorators/apply-role.decorator';

@ApiTags('Auction')
@Controller('auction')
export class AuctionController {
  constructor(
    private readonly getAuctionsUseCase: GetAuctionsUseCase,
    private readonly getAuctionBidsUseCase: GetAuctionBidsUseCase,
    private readonly endAuctionUseCase: EndAuctionUseCase,
    private readonly createAuctionBidUseCase: CreateAuctionBidUseCase,
  ) {}

  @ApiOperation({ summary: 'Get all open auctions' })
  @Get('/')
  public getAuctions() {
    return this.getAuctionsUseCase.execute();
  }

  @ApiOperation({ summary: 'Get all bids of an auction' })
  @Get('/:auctionId/bid')
  public getAuctionBids(@Param('auctionId') auctionId: string) {
    return this.getAuctionBidsUseCase.execute({ auctionId });
  }

  @ApiOperation({ summary: 'Create a bid for an auction' })
  @ProtectedRoute()
  @Post('/:auctionId/bid')
  public createAuctionBid(
    @Param('auctionId') auctionId: string,
    @CurrentUser() user: DecodedUserToken,
    @Body() body: CreateAuctionBidDto,
  ) {
    return this.createAuctionBidUseCase.execute({ auctionId, value: body.value, userId: user.id });
  }

  @ApiOperation({ summary: 'End an auction (only ADMIN users)' })
  @ApplyRoleGuard(UserRole.ADMIN)
  @ProtectedRoute()
  @Post('/:auctionId/end')
  public endAuction(@Param('auctionId') auctionId: string) {
    return this.endAuctionUseCase.execute({ auctionId });
  }
}
