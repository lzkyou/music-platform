import { Global, Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { DbService } from './db.service';
import { Action } from './models/action.model';
import { Ads } from './models/ads.model';
import { Album } from './models/album.model';
import { Post } from './models/post.model';
import { Singer } from './models/singer.model';
import { Song } from './models/song.model';
import { SongList } from './models/songlist.model';
import { User } from './models/user.model';
import { Comment } from './models/comment.model' 
import { Radio } from './models/radio.model';

const models = TypegooseModule.forFeature([
  User,
  Singer,
  Album,
  Song,
  Ads,
  SongList,
  Post,
  Action,
  Comment,
  Radio
])

@Global()
@Module({
  imports:[
    TypegooseModule.forRoot('mongodb://localhost:27017/music-platform',{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }),
    models
  ],
  providers: [DbService],
  exports: [DbService,models],
})
export class DbModule {}
