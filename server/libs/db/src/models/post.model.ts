import { ApiProperty } from "@nestjs/swagger";
import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { User } from "./user.model";

@modelOptions({
  schemaOptions:{
    timestamps: true
  }
})
export class Post{
  @ApiProperty({example:'用户id'})
  @prop({ref: 'User'})
  user: Ref<User>;

  @ApiProperty({example:'动态内容'})
  @prop()
  content: string

  @ApiProperty({example:'动态图片'})
  @prop()
  imgs: []
}