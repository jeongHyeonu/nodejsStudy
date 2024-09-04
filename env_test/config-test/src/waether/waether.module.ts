import { Module } from '@nestjs/common';
import { WeatherController } from './waether.controller';

@Module({
  controllers: [WeatherController],
})
export class WeatherModule {}