import { IsNotEmpty, IsString } from "class-validator";

export class UpdateWorkoutDto{
    @IsNotEmpty()
    @IsString()
    workoutName: string;
}