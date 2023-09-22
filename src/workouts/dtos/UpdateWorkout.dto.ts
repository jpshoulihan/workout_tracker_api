import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateWorkoutDto{
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    workoutName: string;
}