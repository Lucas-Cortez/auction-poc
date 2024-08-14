import { Injectable } from '@nestjs/common';
import { Environment } from 'src/modules/global/domain/services/env.service';
import { ConnectionOptionsService } from '../../app/services/connection-options.service';

@Injectable()
export class PrismaConnectionOptionsService implements ConnectionOptionsService {
  constructor(private readonly environment: Environment) {}

  getDatabaseUrl(): string {
    const {
      DATABASE_USERNAME: username,
      DATABASE_PASSWORD: password,
      DATABASE_HOST: host,
      DATABASE_PORT: port,
      DATABASE_NAME: name,
    } = this.environment;

    return `mongodb://${username}:${password}@${host}:${port}/${name}?retryWrites=true&w=majority&authSource=admin&directConnection=true`;
  }
}
