import { Comment } from '@libs/db/models/comment.model';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('comments')
export class CommentsController {
  constructor(@InjectModel(Comment) private readonly commentModel: ReturnModelType<typeof Comment>) { }

  @Get()
  async getComents(@Query() dto) {
    return await this.commentModel.find().where({
      object: dto.object
    }).populate('user')
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async newComments(@Body() dto, @CurrentUser() user) {
    dto.user = user._id
    return await this.commentModel.create(dto)
  }

}
