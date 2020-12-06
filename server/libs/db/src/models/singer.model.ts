import { ApiProperty } from "@nestjs/swagger";
import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Album } from "./album.model";

@modelOptions({
  schemaOptions:{
    toJSON: {virtuals: true}
  }
})

export class Singer{
  @ApiProperty({example: '歌手名称'})
  @prop()
  name: string

  @ApiProperty({example: '歌手封面'})
  @prop()
  cover: string

  @ApiProperty({example: '歌手简介'})
  @prop()
  introduction: string

  @prop({
    ref: 'Album',
    localField: '_id',
    foreignField: 'belong'
  })
  albums: Ref<Album>[]
}