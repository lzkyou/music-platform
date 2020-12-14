import { Post } from '@libs/db/models/post.model';
import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';

@Module({
  imports:[
    Post
  ],
  controllers: [PostsController]
})
export class PostsModule {}
