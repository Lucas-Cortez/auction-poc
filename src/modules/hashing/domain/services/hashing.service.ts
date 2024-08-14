export abstract class HashingService {
  abstract hash(data: string, salt: string): Promise<string>;
  abstract compare(data: string, encrypted: string): Promise<boolean>;
  abstract generateSalt(rounds?: number): Promise<string>;
}
