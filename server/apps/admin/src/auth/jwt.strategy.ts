import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt'
import { PassportStrategy } from "@nestjs/passport";
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';

export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    @InjectModel(User) private readonly userModel:ReturnModelType<typeof User>){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '201920140083lzk'
    } as StrategyOptions)
  }

  async validate({id,permission}){
    if(permission !== '管理员'){
      return {
        permission: '非管理员'
      }
    }
    else{
      return await this.userModel.findById(id);
    }
  }
}