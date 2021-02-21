import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Post } from "./post.model";
import { Song } from "./song.model";
import { User } from "./user.model";

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Action {
  @prop({ ref: 'User' })
  user: Ref<User>

  @prop({ enum: ['Post', 'Song', 'User'] })
  type: string

  @prop({ refPath: 'type' })
  object: Ref<Post | Song | User>

  @prop({ enum: ['like', 'collect','follow'] })
  name: string
}