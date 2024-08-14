export interface Car {
  carId: string;
  model: string;
  brand: string;
  license: string;
  km: number;
  minimumPrice: number;
  ownerId: string;

  createdAt: Date;
  updatedAt: Date;
}

export type CreateCar = Omit<Car, 'carId' | 'createdAt' | 'updatedAt'>;
