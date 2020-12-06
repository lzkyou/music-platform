import { DbModule } from '@libs/db';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from './users/users.module';
import { SingersModule } from './singers/singers.module';
import { AlbumsModule } from './albums/albums.module';
import { MulterModule } from '@nestjs/platform-express';
import { SongsModule } from './songs/songs.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MulterModule.register({
      dest: 'uploads'
    }),
    DbModule,
    UsersModule,
    SingersModule,
    AlbumsModule,
    SongsModule,
    AuthModule
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}