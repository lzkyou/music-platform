import { Action } from '@libs/db/models/action.model';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CurrentUser } from '../auth/current-user.decorator';

// @Crud({
//   model: Action
// })

@ApiTags('用户操作')
@Controller('actions')
export class ActionsController {
  constructor(@InjectModel(Action) private readonly actionModel:ReturnModelType<typeof Action>){}

  @Get('status')
  @UseGuards(AuthGuard('jwt'))
  async getStatus(@Query() dto, @CurrentUser() user){
    dto.user = user._id
    const count = await this.actionModel.countDocuments(dto)
    // console.log(count);
    
    return {
      status: count > 0
    }
  }

  @Post('toggle')
  @UseGuards(AuthGuard('jwt'))
  async Toggle(@Body() dto, @CurrentUser() user){
    dto.user = user._id
    const res = await this.getStatus(dto,user)
    if(res.status){
      await this.actionModel.deleteMany(dto)
    }
    else{
      await this.actionModel.create(dto)
    }
    return await this.getStatus(dto,user);
  }
}
