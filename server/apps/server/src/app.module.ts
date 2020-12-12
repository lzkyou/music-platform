import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdsModule } from './ads/ads.module';
import { DbModule } from '@libs/db';
import { SonglistModule } from './songlist/songlist.module';
import { AlbumsModule } from './albums/albums.module';
import { SongsModule } from './songs/songs.module';

@Module({
  imports: [DbModule,AdsModule, SonglistModule, AlbumsModule, SongsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
