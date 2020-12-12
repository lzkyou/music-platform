import { Album } from '@libs/db/models/album.model';
import { Controller } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Album,
  routes:{
    create: false,
    update: false,
    delete: false
  }
})
@Controller('albums')
export class AlbumsController {
  constructor(@InjectModel(Album) private readonly model){}
}
