import { Singer } from '@libs/db/models/singer.model';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Singer,
  routes: {
    create: false,
    delete: false,
    update: false,
  }
})
@Controller('singers')
@ApiTags('歌手')
export class SingersController {
  constructor(@InjectModel(Singer) private readonly model: ReturnModelType<typeof Singer>) { }
}
