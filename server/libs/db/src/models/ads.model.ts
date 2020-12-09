import { ApiProperty } from "@nestjs/swagger";
import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Singer } from "./singer.model";
import { Song } from "./song.model";

@modelOptions({
  schemaOptions:{
    // toJSON: {virtuals: true}
  }
})

export class Ads{
  
  @ApiProperty({example: '广告位'})
  @prop()
  name: string

  @ApiProperty({example: '广告图'})
  @prop()
  items: []
  
}