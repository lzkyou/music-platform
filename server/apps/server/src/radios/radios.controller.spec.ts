import { Test, TestingModule } from '@nestjs/testing';
import { RadiosController } from './radios.controller';

describe('RadiosController', () => {
  let controller: RadiosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RadiosController],
    }).compile();

    controller = module.get<RadiosController>(RadiosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
