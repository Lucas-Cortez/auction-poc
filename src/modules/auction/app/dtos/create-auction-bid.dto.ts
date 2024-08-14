import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class CreateAuctionBidDto {
  @ApiProperty({ required: true, description: 'The bid value' })
  @IsNumber()
  @IsPositive()
  value: number;
}
