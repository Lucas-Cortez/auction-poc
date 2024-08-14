import { Injectable } from '@nestjs/common';
import { compare, hash, genSalt } from 'bcrypt';
import { HashingService } from '../../domain/services/hashing.service';

@Injectable()
export class BcryptHashingService implements HashingService {
  async hash(data: string, salt: string) {
    return hash(data, salt);
  }

  async compare(data: string, encrypted: string) {
    if (!data || !encrypted) {
      return false;
    }

    return await compare(data, encrypted);
  }

  async generateSalt(rounds: number = 10) {
    return genSalt(rounds);
  }
}
