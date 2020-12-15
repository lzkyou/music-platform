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
  @prop({
    unique: true
  })
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
  @prop({
    get(val){
      return val
    },
    set(val){
      if(val===''){
        return '用户'
      }
      else{
        return val
      }
    }
  })
  nickname: string

  @ApiProperty({example: '用户权限'})
  @prop({
    get(val){
      return val
    },
    set(val){
      if(val===''){
        return '用户'
      }
      else{
        return val
      }
    }
  })
  permission: string

  @ApiProperty({example: '头像'})
  @prop({
    get(val){
      return val
    },
    set(val){
      if(val===''){
        return 'http://localhost:3002/uploads/5323d1e75c122adc10235baad323107f'
      }
      else{
        return val
      }
    }
  })
  topic: string
}