import { Module } from '@nestjs/common';
import { AdsController } from './ads.controller';

@Module({
  controllers: [AdsController]
})
export class AdsModule {}
