import { Module } from '@nestjs/common';
import { SingersController } from './singers.controller';

@Module({
  controllers: [SingersController]
})
export class SingersModule {}
