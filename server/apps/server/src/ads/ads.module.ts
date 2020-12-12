import { Ads } from '@libs/db/models/ads.model';
import { Module } from '@nestjs/common';
import { AdsController } from './ads.controller';

@Module({
  imports:[
    Ads
  ],
  controllers: [AdsController]
})
export class AdsModule {}
