import { Injectable } from '@nestjs/common';
import { SeedContext } from '../contracts/seed-context';
import { Seeder } from '../contracts/seeder';
import { Stage } from 'src/modules/global/domain/constants/env';
import { Environment } from 'src/modules/global/domain/services/env.service';

@Injectable()
export class MultiEnvironmentSeedContext implements SeedContext {
  private providers: Map<string, Seeder[]> = new Map();

  constructor(protected readonly environment: Environment) {}

  public async addProvider(seeder: Seeder, environments: Stage[]) {
    environments.forEach((envVar) => {
      const storedSeeds = this.providers.get(envVar) || [];

      this.providers.set(envVar, [...storedSeeds, seeder]);
    });
  }

  public async seed(): Promise<void> {
    for (const [envToExecute, providers] of this.providers.entries()) {
      if (envToExecute !== this.environment.NODE_ENV) continue;

      for (const provider of providers) {
        await provider.execute();
      }
    }
  }
}
