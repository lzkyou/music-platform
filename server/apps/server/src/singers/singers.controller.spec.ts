import { Test, TestingModule } from '@nestjs/testing';
import { SingersController } from './singers.controller';

describe('SingersController', () => {
  let controller: SingersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SingersController],
    }).compile();

    controller = module.get<SingersController>(SingersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
