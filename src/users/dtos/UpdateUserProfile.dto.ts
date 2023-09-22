import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class UpdateUserProfileDto {
    @IsString()
    @ApiProperty()
    firstName: string;

    @IsString()
    @ApiProperty()
    lastName: string;

    @IsNumber()
    @ApiProperty()
    age: number;

    @IsNumber()
    @ApiProperty()
    weight: number;

    @IsString()
    @ApiProperty()
    height: number;

    @IsString()
    @ApiProperty()
    avatar: string;

    @IsString()
    @ApiProperty()
    username: string;
}