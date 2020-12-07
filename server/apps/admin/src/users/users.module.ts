import { CommonModule } from '@app/common';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';

@Module({
  imports:[
    CommonModule
  ],
  controllers: [UsersController]
})
export class UsersModule {}
