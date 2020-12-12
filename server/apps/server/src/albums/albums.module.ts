import { Album } from '@libs/db/models/album.model';
import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';

@Module({
  imports:[
    Album
  ],
  controllers: [AlbumsController]
})
export class AlbumsModule {}
