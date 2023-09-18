import { Test, TestingModule } from '@nestjs/testing';
import { BaseExercisesController } from './base_exercises.controller';

describe('BaseExercisesController', () => {
  let controller: BaseExercisesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BaseExercisesController],
    }).compile();

    controller = module.get<BaseExercisesController>(BaseExercisesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
