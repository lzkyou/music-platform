import { CommonModule } from '@app/common';
import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';

@Module({
  imports:[
    CommonModule
  ],
  controllers: [SongsController]
})
export class SongsModule {}
