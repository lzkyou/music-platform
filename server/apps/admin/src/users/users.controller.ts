import { User } from '@libs/db/models/user.model';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: User
})
@ApiTags('网站用户管理')
@Controller('users')
export class UsersController {
  constructor(@InjectModel(User) private readonly model){}

  @Get('options')
  async option() {
    const users = (await this.model.find()).map(v => ({
      label: v.permission,
      value: v._id
    }))
    return {
      title: "用户管理",
      align: "center",
      headerAlign: "center",
      border: true,
      stripe: true,
      searchMenuSpan:8,
      column: [
        { prop: "username", label: "用户名", row:true, span:24, sortable: true, search: true, reg: true },
        { prop: "permission", label: "权限", row: true, type: "select", dicData: users },
      ],
    }
  }
}
