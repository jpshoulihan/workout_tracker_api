import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateCalendarEntryDto {

    @IsString()
    @ApiProperty()
    workoutId: string
    
    @ApiProperty()
    date: Date

}