import { Radio } from '@libs/db/models/radio.model';
import { Controller } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Radio,
  routes:{
    create: false,
    update: false,
    delete: false,
  }
})
@Controller('radios')
export class RadiosController {
  constructor(@InjectModel(Radio) private readonly model:ReturnModelType<typeof Radio>){}
}
