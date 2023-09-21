import { IsEnum, IsString } from "class-validator";

enum ActionType {
    PUSH = 'push',
    PULL = 'pull',
}

enum BodySplitType {
    UPPER = 'upper',
    LOWER = 'lower',
}

export class UpdateCustomExerciseDto {

    @IsEnum(BodySplitType)
    bodySplit: BodySplitType;

    @IsEnum(ActionType)
    action: ActionType;

    @IsString()
    equipment: string;

    @IsString()
    exerciseName: string;

    @IsString()
    instruction: string;

}