import { CommonModule } from '@app/common';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[
    PassportModule,
    CommonModule
  ],
  controllers: [AuthController],
  providers:[LocalStrategy,JwtStrategy]
})
export class AuthModule {}
