import { Ads } from '@libs/db/models/ads.model';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Ads,
  routes:{
    create: false,
    update: false,
    delete: false
  }
})
@Controller('ads')
@ApiTags('广告位')
export class AdsController {
  constructor(@InjectModel(Ads) private readonly model){}
}
