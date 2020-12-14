import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdsModule } from './ads/ads.module';
import { DbModule } from '@libs/db';
import { SonglistModule } from './songlist/songlist.module';
import { AlbumsModule } from './albums/albums.module';
import { SongsModule } from './songs/songs.module';
import { SingersModule } from './singers/singers.module';
import { PostsModule } from './posts/posts.module';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [DbModule,AdsModule, SonglistModule, AlbumsModule, SongsModule, SingersModule, PostsModule],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
