import { Car, CreateCar } from '../entities/car';

export abstract class CarRepository {
  abstract create(car: CreateCar): Promise<{ carId: string }>;
  abstract findBylicense(license: string): Promise<Car | null>;
  abstract findById(carId: string): Promise<Car | null>;
}
