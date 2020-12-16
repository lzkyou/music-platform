import { Post } from '@libs/db/models/post.model';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Post,
})
@Controller('posts')
@ApiTags('动态')
export class PostsController {
  constructor(@InjectModel(Post) private readonly model: ReturnModelType<typeof Post>) { }

  @Get('options')
  async option() {
    return {
      title: "动态管理",
      align: "center",
      headerAlign: "center",
      border: true,
      stripe: true,
      searchMenuSpan: 8,
      column: [
        { prop: "poster", label: "发布用户", row: true, span: 24, sortable: true, search: true, reg: true },
        { prop: "content", label: "动态内容", row: true, type: "textarea", },
        { prop: "imgs", label: "动态图片", row: true, type: "upload", multiple: true, accept:"image/png, image/jpeg, image/webp", action: 'upload' },
      ],
    }
  }
}