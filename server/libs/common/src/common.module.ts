import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CommonService } from './common.service';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: '201920140083lzk'
    }),
  ],
  providers: [CommonService],
  exports: [CommonService, JwtModule],
})
export class CommonModule { }
