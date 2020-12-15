import { Strategy, IStrategyOptions } from 'passport-local'
import { PassportStrategy } from "@nestjs/passport";
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { BadRequestException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';

export class LocalStrategy extends PassportStrategy(Strategy){
  constructor(
    @InjectModel(User) private readonly userModel:ReturnModelType<typeof User>){
    super({
      usernameField: 'username',
      passwordField: 'password'
    } as IStrategyOptions)
  }

  async validate(username: string, password: string){
    const user = await this.userModel.findOne({username}).select('+password')
    // console.log(user);
    
    if(!user){
      throw new BadRequestException('用户名或密码错误！')
    }
    if(!compareSync(password, user.password)){
      throw new BadRequestException('用户名或密码错误！')
    }
    return user
  }
}