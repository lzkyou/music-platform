import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { Comment } from '@libs/db/models/comment.model'

@Module({
  imports:[
    Comment
  ],
  controllers: [CommentsController]
})
export class CommentsModule {}
