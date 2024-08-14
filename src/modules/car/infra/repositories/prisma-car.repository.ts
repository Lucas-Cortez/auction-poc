import { Injectable } from '@nestjs/common';
import { CarRepository } from '../../domain/repositories/car.repository';
import { PrismaService } from 'src/modules/database/infra/prisma/prisma.service';
import { Car, CreateCar } from '../../domain/entities/car';

@Injectable()
export class PrismaCarRepository implements CarRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(car: CreateCar): Promise<{ carId: string }> {
    const { carId } = await this.prismaService.car.create({
      data: {
        brand: car.brand,
        km: car.km,
        license: car.license,
        model: car.model,
        minimumPrice: car.minimumPrice,
        ownerId: car.ownerId,
      },
    });

    return { carId };
  }

  async findById(carId: string): Promise<Car | null> {
    const car = await this.prismaService.car.findUnique({
      where: { carId },
    });

    return car;
  }

  async findBylicense(license: string): Promise<Car | null> {
    const car = await this.prismaService.car.findUnique({ where: { license } });

    return car;
  }
}
