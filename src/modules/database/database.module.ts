import { Global, Module } from '@nestjs/common';

import { PrismaService } from './infra/prisma/prisma.service';
import { PrismaConnectionOptionsService } from './infra/prisma/prisma-connection-options.service';
import { ConnectionOptionsService } from './app/services/connection-options.service';

@Global()
@Module({
  providers: [
    PrismaService,
    { provide: ConnectionOptionsService, useClass: PrismaConnectionOptionsService },
    {
      provide: 'DATABASE_URL',
      useFactory: (connectionOptionsService: ConnectionOptionsService) => {
        const databaseUrl = connectionOptionsService.getDatabaseUrl();
        return databaseUrl;
      },
      inject: [ConnectionOptionsService],
    },
  ],
  exports: [PrismaService],
})
export class DatabaseModule {}
