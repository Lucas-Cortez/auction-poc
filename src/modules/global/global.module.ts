import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DotEnvService } from './infra/services/env.service';
import { Environment } from './domain/services/env.service';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [{ provide: Environment, useClass: DotEnvService }],
  exports: [Environment],
})
export class GlobalModule {}
