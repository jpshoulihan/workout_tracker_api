import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateWorkoutExerciseDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    exerciseId: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    workoutId: string;
}