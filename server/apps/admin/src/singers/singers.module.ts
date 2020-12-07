import { CommonModule } from '@app/common';
import { Module } from '@nestjs/common';
import { SingersController } from './singers.controller';

@Module({
  imports:[
    CommonModule
  ],
  controllers: [SingersController]
})
export class SingersModule {}
