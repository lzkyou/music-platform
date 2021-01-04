import { ApiProperty } from "@nestjs/swagger";
import { modelOptions, prop, Ref } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions:{
    // toJSON: {virtuals: true}
  }
})

export class Radio{
  
  @ApiProperty({example: '电台名'})
  @prop()
  name: string

  @ApiProperty({example: '创建人'})
  @prop()
  creator: string

  @ApiProperty({example: '电台简介'})
  @prop()
  introduction: string

  @ApiProperty({example: '电台封面'})
  @prop()
  cover: string
  
}