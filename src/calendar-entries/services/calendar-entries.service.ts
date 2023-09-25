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
                user: { id: id },
                workout: { id: createCalendarEntryDto.workoutId }
            }
        )
        return this.CalendarEntriesRepository.save(newCalendarEntry)
    }

    getCalendarEntries() {
        return this.CalendarEntriesRepository.find({
            relations: {
                workout: true
            }
        });


    }

    async getCalendarEntryById(id: string){
        const calendarEntry = await this.CalendarEntriesRepository.findOne({where: {id:id}})
        return calendarEntry
    }

    async deleteCalendarEntryById(id: string) {
        const calendarEntry = await this.CalendarEntriesRepository.findOne({ where: { id } })
        if(calendarEntry){
            return this.CalendarEntriesRepository.createQueryBuilder('calendar-entry')
            .delete()
            .from(CalendarEntry)
            .where("id = :id", { id: id })
            .execute()
        }

        return { Error: `Calendar Entry not found` }
    }
}
