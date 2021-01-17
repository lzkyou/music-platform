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

  @prop({ enum: ['Post', 'Song'] })
  type: string

  @prop({ refPath: 'type' })
  object: Ref<Post | Song>

  @prop({ enum: ['like', 'collect'] })
  name: string
}