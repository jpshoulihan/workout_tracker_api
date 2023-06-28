import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutExercisesController } from './workout-exercises.controller';

describe('WorkoutExercisesController', () => {
  let controller: WorkoutExercisesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutExercisesController],
    }).compile();

    controller = module.get<WorkoutExercisesController>(WorkoutExercisesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
