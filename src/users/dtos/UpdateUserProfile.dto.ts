import { IsString, IsNumber } from 'class-validator';

export class UpdateUserProfileDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsNumber()
    age: number;

    @IsNumber()
    weight: number;

    @IsString()
    height: number;

    @IsString()
    avatar: string;

    @IsString()
    username: string;
}