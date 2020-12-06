import { Album } from '@libs/db/models/album.model';
import { Singer } from '@libs/db/models/singer.model';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Album
})
@ApiTags('专辑管理')
@Controller('albums')
export class AlbumsController {
  constructor(
    @InjectModel(Album) private readonly model,
    @InjectModel(Singer) private readonly singerModel: ReturnModelType<typeof Singer>
  ) { }

  @Get('options')
  async option() {
    const singers = (await this.singerModel.find()).map(v => ({
      label: v.name,
      value: v._id
    }))
    return {
      title: "专辑管理",
      align: "center",
      headerAlign: "center",
      border: true,
      stripe: true,
      searchMenuSpan: 8,
      column: [
        { prop: "name", label: "专辑名称", row: true, span: 24, sortable: true, search: true, reg: true },
        { prop: "belong", label: "所属歌手", row: true, type: "select", dicData: singers },
        { prop: "publish", label: "发布日期", row: true, type:"date", format: 'yyyy-MM-dd', valueFormat: 'yyyy-MM-dd' },
        { prop: "cover", label: "专辑封面", row: true, type: "upload", listType: "picture-img", action: 'upload' },
      ],
    }
  }
}
