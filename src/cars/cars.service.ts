import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carsRepository: Repository<Car>,
  ) {}

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const car = this.carsRepository.create(createCarDto);
    return this.carsRepository.save(car);
  }

  async findById(id: string): Promise<Car> {
    const car = await this.carsRepository.findOne({ where: { id } });
    if (!car) {
      throw new NotFoundException(`La voiture avec ID "${id}" n'existe pas`);
    }
    return car;
  }

  async findByBrand(brand: string): Promise<Car[]> {
    return this.carsRepository.find({ where: { brand } });
  }

  async update(id: string, updateCarDto: UpdateCarDto): Promise<Car> {
    const car = await this.findById(id);

    Object.assign(car, updateCarDto);

    return this.carsRepository.save(car);
  }

  async delete(id: string): Promise<void> {
    const result = await this.carsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`La voiture avec ID "${id}" n'existe pas`);
    }
  }
}
