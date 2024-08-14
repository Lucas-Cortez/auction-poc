import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { GlobalModule } from './modules/global/global.module';
import { CarModule } from './modules/car/car.module';
import { AuctionModule } from './modules/auction/auction.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { SeedsModule } from './modules/seeds/seeds.module';

@Module({
  imports: [GlobalModule, DatabaseModule, AuthModule, CarModule, AuctionModule, UserModule, SeedsModule],
})
export class AppModule {}
