import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Environment } from 'src/modules/global/domain/services/env.service';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(@Inject('DATABASE_URL') databaseUrl: string, environment: Environment) {
    super({
      datasources: { db: { url: databaseUrl } },
      log: environment.NODE_ENV === 'development' ? ['warn', 'error'] : [],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
