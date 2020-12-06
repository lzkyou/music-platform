import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';

@Module({
  controllers: [AlbumsController]
})
export class AlbumsModule {}
