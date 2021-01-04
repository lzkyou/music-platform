import { Radio } from '@libs/db/models/radio.model';
import { Module } from '@nestjs/common';
import { RadiosController } from './radios.controller';

@Module({
  imports:[
    Radio
  ],
  controllers: [RadiosController]
})
export class RadiosModule {}
