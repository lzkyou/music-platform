import { ApiProperty } from "@nestjs/swagger";

export class RegDto{
  @ApiProperty()
  username: string
  @ApiProperty()
  password: string
  @ApiProperty()
  nickname: string
}