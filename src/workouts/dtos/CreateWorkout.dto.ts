import { IsNotEmpty, IsString } from "class-validator";

export class CreateWorkoutDto{
    @IsNotEmpty()
    @IsString()
    workoutName: string;

    @IsNotEmpty()
    userId: string;
}