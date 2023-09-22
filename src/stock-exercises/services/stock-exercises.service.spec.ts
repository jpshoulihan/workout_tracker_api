import { Test, TestingModule } from '@nestjs/testing';
import { StockExercisesService } from './stock-exercises.service';

describe('StockExercisesService', () => {
  let service: StockExercisesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockExercisesService],
    }).compile();

    service = module.get<StockExercisesService>(StockExercisesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
