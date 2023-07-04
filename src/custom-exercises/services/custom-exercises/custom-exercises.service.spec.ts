import { Test, TestingModule } from '@nestjs/testing';
import { CustomExercisesService } from './custom-exercises.service';

describe('CustomExercisesService', () => {
  let service: CustomExercisesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomExercisesService],
    }).compile();

    service = module.get<CustomExercisesService>(CustomExercisesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
