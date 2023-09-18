import { Test, TestingModule } from '@nestjs/testing';
import { BaseExercisesService } from './base_exercises.service';

describe('BaseExercisesService', () => {
  let service: BaseExercisesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseExercisesService],
    }).compile();

    service = module.get<BaseExercisesService>(BaseExercisesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
