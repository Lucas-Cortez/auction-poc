import { Module } from '@nestjs/common';
import { MultiEnvironmentSeedContext } from './providers/multi-environment-seed-context';
import { UsersSeeder } from './seeders/users.seeder';
import { UserModule } from '../user/user.module';
import { SeedContext } from './contracts/seed-context';
import { SeedOnApplicationInitHandler } from './handlers/seed-on-application-init.handler';
import { Stage } from '../global/domain/constants/env';
import { HashingModule } from '../hashing/hashing.module';

const SEEDERS = [UsersSeeder];

@Module({
  imports: [UserModule, HashingModule],
  providers: [
    {
      provide: SeedContext,
      useFactory: (seeder: MultiEnvironmentSeedContext, usersSeeder) => {
        seeder.addProvider(usersSeeder, [Stage.DEVELOPMENT, Stage.PRODUCTION]);
        return seeder;
      },
      inject: [MultiEnvironmentSeedContext, ...SEEDERS],
    },
    MultiEnvironmentSeedContext,
    SeedOnApplicationInitHandler,
    ...SEEDERS,
  ],
})
export class SeedsModule {}
