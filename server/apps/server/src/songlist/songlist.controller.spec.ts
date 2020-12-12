import { Test, TestingModule } from '@nestjs/testing';
import { SonglistController } from './songlist.controller';

describe('SonglistController', () => {
  let controller: SonglistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SonglistController],
    }).compile();

    controller = module.get<SonglistController>(SonglistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
