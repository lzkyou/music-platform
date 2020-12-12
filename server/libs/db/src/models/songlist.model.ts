import { ApiProperty } from "@nestjs/swagger";
import { modelOptions, prop, Ref } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions:{
    // toJSON: {virtuals: true}
    timestamps: true
  }
})

export class SongList{
  
  @ApiProperty({example: '歌单名称'})
  @prop()
  name: string

  @ApiProperty({example: '歌单封面'})
  @prop()
  cover: string
  
}