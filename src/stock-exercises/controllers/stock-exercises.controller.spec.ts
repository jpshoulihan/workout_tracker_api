import { Test, TestingModule } from '@nestjs/testing';
import { StockExercisesController } from './stock-exercises.controller';

describe('StockExercisesController', () => {
  let controller: StockExercisesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockExercisesController],
    }).compile();

    controller = module.get<StockExercisesController>(StockExercisesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
