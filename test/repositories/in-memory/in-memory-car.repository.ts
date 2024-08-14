import { randomUUID } from 'node:crypto';
import { CreateCar, Car } from 'src/modules/car/domain/entities/car';
import { CarRepository } from 'src/modules/car/domain/repositories/car.repository';

export class InMemoryCarRepository implements CarRepository {
  public cars: Car[] = [
    {
      carId: '023c0f2a-604f-468f-a16c-d7dac9780de0',
      brand: 'ford',
      model: 'fiesta',
      license: 'fjb4e12',
      km: 10000,
      minimumPrice: 30000,
      ownerId: '4e0524ec-107e-4b9f-b4f3-03c094e0cd8f',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async create(car: CreateCar): Promise<{ carId: string }> {
    const newCar: Car = {
      ...car,
      carId: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.cars.push(newCar);

    return { carId: newCar.carId };
  }

  async findBylicense(license: string): Promise<Car | null> {
    const car = this.cars.find((car) => car.license === license);

    if (!car) return null;

    return car;
  }

  async findById(carId: string): Promise<Car | null> {
    const car = this.cars.find((car) => car.carId === carId);

    if (!car) return null;

    return car;
  }
}
