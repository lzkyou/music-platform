import { Singer } from '@libs/db/models/singer.model';
import { Module } from '@nestjs/common';
import { SingersController } from './singers.controller';


@Module({
  imports:[
    Singer
  ],
  controllers: [SingersController]
})
export class SingersModule {}
