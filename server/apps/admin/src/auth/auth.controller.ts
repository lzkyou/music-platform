import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('后台用户管理')
export class AuthController {
  constructor(private jwtService: JwtService){}

  @Post('login')
  @ApiOperation({summary: '登录'})
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto: LoginDto, @Req() req){
    return {
      token: this.jwtService.sign({
        id: String(req.user._id),
        permission: String(req.user.permission)
      })
    }
  }

  @Get('user')
  @ApiOperation({summary: '获取信息'})
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async user(@Req() req){
    return req.user
  }
}
