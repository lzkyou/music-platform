import { Song } from '@libs/db/models/song.model';
import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Song,
  routes:{
    create: false,
    update: false,
    delete: false
  }
})
@Controller('songs')
export class SongsController {
  constructor(@InjectModel(Song) private readonly model){}

  @Get('random')
  async random() {
    return await this.model.aggregate([
      { $sample: { size: 5 } }
    ])
  }
}
