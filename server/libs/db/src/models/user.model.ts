import { ApiProperty } from "@nestjs/swagger";
import { modelOptions, prop } from "@typegoose/typegoose";
import { hashSync } from "bcryptjs";

@modelOptions({
  schemaOptions:{
    timestamps: true
  }
})
export class User{
  @ApiProperty({example: '用户名'})
  @prop()
  username: string

  @ApiProperty({example: '密码'})
  @prop({
    get(val){
      return val
    },
    set(val){
      return hashSync(val,10)
    },
    select: false
  })
  password: string

  @ApiProperty({example: '昵称'})
  @prop()
  nickname: string

  @ApiProperty({example: '用户权限'})
  @prop()
  permission: string

  @ApiProperty({example: '头像'})
  @prop()
  topic: string
}