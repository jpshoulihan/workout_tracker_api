import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CalendarEntry } from 'src/typeorm/entities/CalendarEntry';
import { Repository } from 'typeorm';
import { CreateCalendarEntryDto } from '../dtos/CalendarEntryDto';

@Injectable()
export class CalendarEntriesService {
    constructor(@InjectRepository(CalendarEntry) private CalendarEntriesRepository: Repository<CalendarEntry>) { }

    createCalendarEntry(id: string, createCalendarEntryDto: CreateCalendarEntryDto) {
        const newCalendarEntry = this.CalendarEntriesRepository.create(
            {
                ...createCalendarEntryDto,
                user: {id: id},
                workout: {id: createCalendarEntryDto.workoutId}
            }
        )

        return this.CalendarEntriesRepository.save(newCalendarEntry)
    }
}
