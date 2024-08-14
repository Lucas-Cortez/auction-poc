export abstract class SeedContext {
  abstract seed(): Promise<void>;
}
