import { Body, Controller, Delete, Get, Inject, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CalendarEntriesService } from '../services/calendar-entries.service';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { CreateCalendarEntryDto } from '../dtos/CalendarEntryDto';
import { Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('calendar-entries')
@ApiTags('Calendar Entries')
export class CalendarEntriesController {
    constructor(@Inject('CALENDAR_ENTRY_SERVICE') private readonly calendarEntriesService: CalendarEntriesService){}
    @UseGuards(AuthenticatedGuard)
    @Post('calendar-entry')
    @ApiOperation({ summary: 'Create calendar entry' })
    @ApiResponse({status: 201, description: 'calendar entry created', type: CreateCalendarEntryDto})
    async createCalendarEntry(@Body() createCalendarEntryDto: CreateCalendarEntryDto, @Req() req: Request){
        const user: any = req.user
        const createCalendarEntry = await this.calendarEntriesService.createCalendarEntry(user.id, createCalendarEntryDto)
        return createCalendarEntry
    }

    @UseGuards(AuthenticatedGuard)
    @Get()
    @ApiOperation({ summary: 'Return all calendar entries' })
    @ApiResponse({status: 201, description: 'All calendar entries returned', isArray:true})
    getCalendarEntries(){
        return this.calendarEntriesService.getCalendarEntries()
    }

    @UseGuards(AuthenticatedGuard)
    @Get('/:id')
    @ApiOperation({ summary: 'Return calendar entry' })
    @ApiResponse({status: 201, description: 'Calendar entry returned'})
    getCalendarEntryBId(@Param('id') id: string){
        return this.calendarEntriesService.getCalendarEntryById(id)
    }

    @UseGuards(AuthenticatedGuard)
    @Delete('calendar-entry/:id')
    @ApiOperation({ summary: 'Delete calendar entry' })
    @ApiResponse({status: 201, description: 'Calendar entry deleted'})
    async deleteCalendarEntryById(@Param('id') id: string){
        const deleteCalendarEntry = await this.calendarEntriesService.deleteCalendarEntryById(id);
        return deleteCalendarEntry
    }
}
