import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt'
import { PassportStrategy } from "@nestjs/passport";
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { BadRequestException } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy,'jwt-api'){
  constructor(
    @InjectModel(User) private readonly userModel:ReturnModelType<typeof User>){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '201920140083lzk'
    } as StrategyOptions)
  }

  async validate(payload: any){
    if(payload===null){
      throw new BadRequestException()
    }
    else{
      return {}
    }
  }
}