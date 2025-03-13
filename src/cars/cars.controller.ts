import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from './entities/car.entity';
import { CreateCarDto, UpdateCarDto } from './dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly _carsService: CarsService) {}

  @Post()
  create(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this._carsService.create(createCarDto);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Car> {
    return this._carsService.findById(id);
  }

  @Get()
  findByBrand(@Query('brand') brand: string): Promise<Car[]> {
    return this._carsService.findByBrand(brand);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto,
  ): Promise<Car> {
    return this._carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this._carsService.delete(id);
  }
}
