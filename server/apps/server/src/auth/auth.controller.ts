import { User, UserDocument } from '@libs/db/models/user.model';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CurrentUser } from './current-user.decorator';
import { LoginDto } from './dto/login.dto';
import { RegDto } from './dto/reg.dto';

@Controller('auth')
@ApiTags('前台用户管理')
export class AuthController {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    private jwtService: JwtService
  ) { }

  @Post('reg')
  @ApiOperation({ summary: '注册' })
  async reg(@Body() dto: RegDto) {
    const { username, password, nickname } = dto
    const user = await this.userModel.create({
      username,
      password,
      nickname,
      permission: '',
      topic: ''
    })
    return user
  }

  @Post('login')
  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto: LoginDto, @CurrentUser() user:UserDocument) {
    return {
      token: this.jwtService.sign({
        id: String(user._id)
      })
    }
  }

  @Get('user')
  @ApiOperation({ summary: '获取信息' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async user(@CurrentUser() user: UserDocument) {
    return user
  }
}