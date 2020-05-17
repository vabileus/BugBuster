import { Test, TestingModule } from '@nestjs/testing';
import { BugsController } from './bugs.controller';

describe('Bugs Controller', () => {
  let controller: BugsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BugsController],
    }).compile();

    controller = module.get<BugsController>(BugsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
