import { User } from '@libs/db/models/user.model';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: User,
  routes: {
    create: false,
    update: false,
    delete: false
  }
})

@Controller('users')
@ApiTags('用户')
export class UsersController {
  constructor(@InjectModel(User) private readonly model:ReturnModelType<typeof User>){}
}
