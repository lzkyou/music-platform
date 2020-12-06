import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CommonService } from './common.service';

@Global()
@Module({
  imports:[
    JwtModule.registerAsync({
      useFactory(){
        return {
          secret: '201920140083liangzekun'
        }
      }
    })
  ],
  providers: [CommonService],
  exports: [CommonService, JwtModule],
})
export class CommonModule {}
