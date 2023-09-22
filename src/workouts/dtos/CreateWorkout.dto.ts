import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateWorkoutDto{
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    workoutName: string;

    @IsNotEmpty()
    @ApiProperty()
    userId: string;
}