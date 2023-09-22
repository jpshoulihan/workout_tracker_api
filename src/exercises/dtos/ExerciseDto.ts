import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";

enum ActionType {
    PUSH = 'push',
    PULL = 'pull',
}

enum BodySplitType {
    UPPER = 'upper',
    LOWER = 'lower',
}

export class ExerciseDto {

    @IsString()
    @ApiProperty()
    userId: string

    @IsEnum(BodySplitType)
    @ApiProperty()
    bodySplit: BodySplitType;

    @IsEnum(ActionType)
    @ApiProperty()
    action: ActionType;

    @IsString()
    @ApiProperty()
    equipment: string;

    @IsString()
    @ApiProperty()
    exerciseName: string;

    @IsString()
    @ApiProperty()
    instruction: string;
}