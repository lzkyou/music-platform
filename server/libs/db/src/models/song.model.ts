import { ApiProperty } from "@nestjs/swagger";
import { prop, Ref } from "@typegoose/typegoose";
import { Album } from "./album.model";

export class Song{
  
  @ApiProperty({example: '歌曲名称'})
  @prop()
  name: string

  @ApiProperty({example: '歌曲文件'})
  @prop()
  song: string

  @ApiProperty({example: 'MV文件'})
  @prop()
  video: string

  @prop({ref: 'album'})
  belong: Ref<Album>
}