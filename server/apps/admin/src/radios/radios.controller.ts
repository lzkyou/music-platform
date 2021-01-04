import { Radio } from '@libs/db/models/radio.model';
import { User } from '@libs/db/models/user.model';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Radio
})
@Controller('radios')
@ApiTags('电台管理')
export class RadiosController {
  constructor(
    @InjectModel(Radio) private readonly model: ReturnModelType<typeof Radio>,
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>
  ) { }

  @Get('options')
  async option() {
    const users = (await this.userModel.find()).map(v => ({
      label: v.username,
      value: v._id
    }))
    return {
      title: "电台管理",
      align: "center",
      headerAlign: "center",
      border: true,
      stripe: true,
      searchMenuSpan: 8,
      column: [
        { prop: "name", label: "电台名称", row: true, span: 24, sortable: true, search: true, reg: true },
        { prop: "creator", label: "创建人", type: "select", dicData: users },
        { prop: "introduction", label: "电台简介", type: "textarea", span: 24, },
        { prop: "cover", label: "电台封面", row: true, type: "upload", listType: "picture-img", action: 'upload', accept: "image/png, image/jpeg, image/webp" },
      ],
    }
  }
}
