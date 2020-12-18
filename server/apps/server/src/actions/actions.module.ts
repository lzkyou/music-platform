import { Action } from '@libs/db/models/action.model';
import { Module } from '@nestjs/common';
import { ActionsController } from './actions.controller';

@Module({
  imports:[
    Action
  ],
  controllers: [ActionsController]
})
export class ActionsModule {}
