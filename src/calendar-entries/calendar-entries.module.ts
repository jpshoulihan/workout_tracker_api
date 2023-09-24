import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarEntry } from 'src/typeorm/entities/CalendarEntry';
import { CalendarEntriesController } from './controllers/calendar-entries.controller';
import { CalendarEntriesService } from './services/calendar-entries.service';

@Module({
    imports: [TypeOrmModule.forFeature([CalendarEntry])],
    controllers: [CalendarEntriesController],
    providers: [
        {
            provide: 'CALENDAR_ENTRY_SERVICE',
            useClass: CalendarEntriesService
        }
    ]
})
export class CalendarEntriesModule {}
