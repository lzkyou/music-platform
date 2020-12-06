import { Album } from '@libs/db/models/album.model';
import { Song } from '@libs/db/models/song.model';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Song
})
@ApiTags('歌曲管理')
@Controller('songs')
export class SongsController {
  constructor(
    @InjectModel(Song) private readonly model,
    @InjectModel(Album) private readonly albumModel: ReturnModelType<typeof Album>
  ) { }

  @Get('options')
  async option() {
    const albums = (await this.albumModel.find()).map(v => ({
      label: v.name,
      value: v._id
    }))
    return {
      title: "歌曲管理",
      align: "center",
      headerAlign: "center",
      border: true,
      stripe: true,
      searchMenuSpan: 8,
      column: [
        { prop: "name", label: "歌曲名称", row: true, span: 24, sortable: true, search: true, reg: true },
        { prop: "belong", label: "所属专辑", row: true, type: "select", dicData: albums },
        { prop: "song", label: "歌曲文件", row: true, type: "upload", limit: 1, dataType: 'string', action: 'upload' },
        { prop: "video", label: "视频文件", row: true, type: "upload", limit: 1, dataType: 'string', action: 'upload' },
      ],
    }
  }
}
