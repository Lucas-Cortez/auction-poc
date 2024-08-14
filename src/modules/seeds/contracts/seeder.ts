export interface Seeder {
  execute(): Promise<void>;
}
