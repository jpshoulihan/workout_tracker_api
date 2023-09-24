import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseStatisticsController } from './exercise-statistics.controller';

describe('ExerciseStatisticsController', () => {
  let controller: ExerciseStatisticsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerciseStatisticsController],
    }).compile();

    controller = module.get<ExerciseStatisticsController>(ExerciseStatisticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
