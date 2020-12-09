import { Ads } from '@libs/db/models/ads.model';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Ads
})
@ApiTags('广告位管理')
@Controller('ads')
export class AdsController {
  constructor(@InjectModel(Ads) private readonly model) { }

  @Get('options')
  async option() {
    return {
      title: "广告管理",
      align: "center",
      headerAlign: "center",
      border: true,
      stripe: true,
      searchMenuSpan: 8,
      column: [
        { prop: "name", label: "广告位名", row: true, span: 24, sortable: true, search: true, reg: true },
        { prop: "items", label: "广告位图片", row: true, type: "upload", action: 'upload', multiple: "true", accept:"image/png, image/jpeg, image/webp" },
      ],
    }
  }
}
