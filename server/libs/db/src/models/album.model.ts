import { ApiProperty } from "@nestjs/swagger";
import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Singer } from "./singer.model";
import { Song } from "./song.model";

@modelOptions({
  schemaOptions:{
    toJSON: {virtuals: true}
  }
})

export class Album{
  
  @ApiProperty({example: '专辑名称'})
  @prop()
  name: string

  @ApiProperty({example: '发布日期'})
  @prop()
  publish: string

  @ApiProperty({example: '专辑封面'})
  @prop()
  cover: string

  @prop({ref: 'singer'})
  belong: Ref<Singer>

  @prop({
    ref: 'Song',
    localField: '_id',
    foreignField: 'belong'
  })
  songs: Ref<Song>[]
}