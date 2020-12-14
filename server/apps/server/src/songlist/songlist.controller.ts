import { SongList } from '@libs/db/models/songlist.model';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: SongList,
  routes:{
    create: false,
    update: false,
    delete: false
  }
})
@Controller('songlist')
@ApiTags('歌单')
export class SonglistController {
  constructor(@InjectModel(SongList) private readonly model){}
}
