import { Injectable, OnModuleInit } from '@nestjs/common';
import { SeedContext } from '../contracts/seed-context';

@Injectable()
export class SeedOnApplicationInitHandler implements OnModuleInit {
  constructor(protected readonly seeder: SeedContext) {}

  public async onModuleInit() {
    await this.seeder.seed();
  }
}
