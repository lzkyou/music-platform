import { SongList } from '@libs/db/models/songlist.model';
import { Module } from '@nestjs/common';
import { SonglistController } from './songlist.controller';

@Module({
  imports:[
    SongList
  ],
  controllers: [SonglistController]
})
export class SonglistModule {}
