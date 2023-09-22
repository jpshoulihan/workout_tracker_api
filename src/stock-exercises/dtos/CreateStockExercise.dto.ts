import { IsEnum, IsString } from "class-validator";

enum EquipmentType {
    BUMBBELL = 'dumbbell',
    BARBELL = 'barbell',
    BODYWEIGHT = 'bodyweight'
}

enum ActionType {
    PUSH = 'push',
    PULL = 'pull',
}

enum BodySplitType {
    UPPER = 'upper',
    LOWER = 'lower',
}

export class CreateStockExerciseDto {

    @IsEnum(BodySplitType)
    bodySplit: BodySplitType;

    @IsEnum(ActionType)
    action: ActionType;

    @IsEnum(EquipmentType)
    equipment: EquipmentType;

    @IsString()
    exerciseName: string;

    @IsString()
    instruction: string;

}