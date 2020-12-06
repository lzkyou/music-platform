import { CommonModule } from '@app/common';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    PassportModule,
    // Nest can't resolve dependencies of the AuthController (?). Please make sure that the argument JwtService at index [0] is available in the AuthModule context.
    //抽离出去的全局模块使用的时候记得要在对应模块导入！！！！！
    //抽离出去的全局模块使用的时候记得要在对应模块导入！！！！！
    //抽离出去的全局模块使用的时候记得要在对应模块导入！！！！！
    //谨记这个报错，耗时一个小时
    CommonModule
  ],
  controllers: [AuthController],
  providers: [LocalStrategy]
})
export class AuthModule { }
