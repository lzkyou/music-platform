import { Post } from '@libs/db/models/post.model';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Post,
  routes:{
    update: false
  }
})
@Controller('posts')
@ApiTags('动态')
export class PostsController {
  constructor(@InjectModel(Post) private readonly model: ReturnModelType<typeof Post>) { }
}
