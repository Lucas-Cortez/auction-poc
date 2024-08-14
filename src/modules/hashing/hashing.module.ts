import { Module } from '@nestjs/common';
import { BcryptHashingService } from './infra/services/bcrypt-hashing.service';
import { HashingService } from './domain/services/hashing.service';

@Module({
  providers: [{ provide: HashingService, useClass: BcryptHashingService }],
  exports: [HashingService],
})
export class HashingModule {}
