import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isEmpty } from 'class-validator';

import { Environment } from '../../domain/services/env.service';
import { Env, Stage } from '../../domain/constants/env';

@Injectable()
export class DotEnvService extends ConfigService implements Environment {
  constructor() {
    super();
  }

  public readonly DATABASE_HOST = this.getOrThrow(Env.DATABASE_HOST);
  public readonly DATABASE_PORT = this.getOrThrow(Env.DATABASE_PORT);
  public readonly DATABASE_USERNAME = this.getOrThrow(Env.DATABASE_USERNAME);
  public readonly DATABASE_PASSWORD = this.getOrThrow(Env.DATABASE_PASSWORD);
  public readonly DATABASE_NAME = this.getOrThrow(Env.DATABASE_NAME);
  public readonly NODE_ENV = this.get(Env.NODE_ENV) || Stage.DEVELOPMENT;
  public readonly JWT_SECRET = this.getOrThrow(Env.JWT_SECRET);
  public readonly BCRYPT_GENERATED_PASSWORD = this.getOrThrow(Env.BCRYPT_GENERATED_PASSWORD);

  public ensureEnvNotEmpty() {
    for (const variable of Object.keys(Env)) {
      const value = this.get(variable);

      if (isEmpty(value)) throw new Error(`Missing "${variable}" environment variable`);
    }
  }
}
