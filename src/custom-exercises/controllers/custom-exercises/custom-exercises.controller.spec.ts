import { Test, TestingModule } from '@nestjs/testing';
import { CustomExercisesController } from './custom-exercises.controller';

describe('CustomExercisesController', () => {
  let controller: CustomExercisesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomExercisesController],
    }).compile();

    controller = module.get<CustomExercisesController>(CustomExercisesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
