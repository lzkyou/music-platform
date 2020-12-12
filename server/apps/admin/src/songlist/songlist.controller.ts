import { SongList } from '@libs/db/models/songlist.model';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: SongList
})
@Controller('songlist')
@ApiTags('歌单管理')
export class SonglistController {
  constructor(@InjectModel(SongList) private readonly model){}

  @Get('options')
  async option() {
    return {
      title: "歌单管理",
      align: "center",
      headerAlign: "center",
      border: true,
      stripe: true,
      searchMenuSpan: 8,
      column: [
        { prop: "name", label: "歌单名称", row: true, span: 24, sortable: true, search: true, reg: true },
        { prop: "cover", label: "歌单封面", row: true, type: "upload", listType: "picture-img", action: 'upload' },
      ],
    }
  }
}
