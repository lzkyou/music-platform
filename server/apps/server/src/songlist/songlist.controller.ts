import { SongList } from '@libs/db/models/songlist.model';
import { Controller, Get } from '@nestjs/common';
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
export class SonglistController {
  constructor(@InjectModel(SongList) private readonly model){}
}
