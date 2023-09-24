import { Test, TestingModule } from '@nestjs/testing';
import { CalendarEntriesController } from './calendar-entries.controller';

describe('CalendarEntriesController', () => {
  let controller: CalendarEntriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalendarEntriesController],
    }).compile();

    controller = module.get<CalendarEntriesController>(CalendarEntriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
