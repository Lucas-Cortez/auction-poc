import { Transform } from 'class-transformer';

export function TrimString(): PropertyDecorator {
  return Transform(({ value }) => (typeof value === 'string' ? value.trim() : value));
}
