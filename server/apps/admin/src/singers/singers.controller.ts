import { Singer } from '@libs/db/models/singer.model';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Singer
})
@ApiTags('歌手管理')
@Controller('singers')
export class SingersController {
  constructor(@InjectModel(Singer) private readonly model){}

  @Get('options')
  option() {
    return {
      title: "歌手管理",
      align: "center",
      headerAlign: "center",
      border: true,
      stripe: true,
      searchMenuSpan:8,
      column: [
        { prop: "name", label: "歌手名称", row:true, span:24, sortable: true, search: true, reg: true },
        { prop: "cover", label: "歌手封面", row:true, type:"upload", listType: "picture-img", action: 'upload/'},
        { prop: "introduction", label: "歌手简介", type: "textarea", span:24,  },
      ],
    }
  }
}
