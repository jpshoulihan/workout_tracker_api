import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseStatisticsService } from './exercise-statistics.service';

describe('ExerciseStatisticsService', () => {
  let service: ExerciseStatisticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseStatisticsService],
    }).compile();

    service = module.get<ExerciseStatisticsService>(ExerciseStatisticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
