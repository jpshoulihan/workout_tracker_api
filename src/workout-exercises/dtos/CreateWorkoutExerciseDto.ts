import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateWorkoutExerciseDto {
    @IsNotEmpty()
    @IsString()
    exerciseId: string;

    @IsNotEmpty()
    @IsString()
    workoutId: string;

    @IsNotEmpty()
    @IsNumber()
    order: number;
}