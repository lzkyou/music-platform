import { User } from '@libs/db/models/user.model';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: User
})
@ApiTags('网站用户管理')
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(@InjectModel(User) private readonly model) { }

  @Get('options')
  async option() {
    const users = [
      { label: '管理员',value: '管理员' },
      { label: '用户', value: '用户' },
    ]
    // console.log(users)
    return {
      title: "用户管理",
      align: "center",
      headerAlign: "center",
      border: true,
      stripe: true,
      searchMenuSpan: 8,
      column: [
        { prop: "username", label: "用户名", row: true, span: 24, sortable: true, search: true, reg: true },
        { prop: "nickname", label: "昵称", row: true, span: 24,},
        { prop: "topic", label: "头像", row: true, type: "upload", listType: "picture-img", action: 'upload' },
        { prop: "permission", label: "权限", row: true, type: "select", dicData: users },
      ],
    }
  }
}
