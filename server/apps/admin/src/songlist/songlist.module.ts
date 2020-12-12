import { Module } from '@nestjs/common';
import { SonglistController } from './songlist.controller';

@Module({
  controllers: [SonglistController]
})
export class SonglistModule {}
