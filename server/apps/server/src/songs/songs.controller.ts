import { Song } from '@libs/db/models/song.model';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Song,
  routes: {
    create: false,
    update: false,
    delete: false
  }
})
@Controller('songs')
@ApiTags('歌曲')
export class SongsController {
  constructor(@InjectModel(Song) private readonly model:ReturnModelType<typeof Song>) { }

  @Get('random')
  async random() {
    return await this.model.aggregate([
      {
        $lookup:{
          from: 'albums',
          localField: 'belong',
          foreignField: '_id',
          as: 'belongTo'
        }
      },
      { $sample: { size: 10 } }
    ])
  }

  @Get('findone')
  async findOne() {
    return await this.model.aggregate([
      {
        $lookup:{
          from: 'albums',
          localField: 'belong',
          foreignField: '_id',
          as: 'belongTo'
        }
      },
      { $sample: { size: 1 } }
    ])
  }
}
