import { EnvVars } from '../entities/env-vars';

export abstract class Environment implements EnvVars {
  NODE_ENV: string;
  DATABASE_HOST: string;
  DATABASE_PORT: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
  JWT_SECRET: string;
  BCRYPT_GENERATED_PASSWORD: string;

  abstract ensureEnvNotEmpty(): void;
}
