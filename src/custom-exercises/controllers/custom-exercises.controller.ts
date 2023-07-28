import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CreateCustomExerciseDto } from 'src/custom-exercises/dtos/CustomExerciseDto';
import { CustomExercisesService } from 'src/custom-exercises/services/custom-exercises.service';
import {Request} from 'express'
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';

@Controller('custom-exercises')
export class CustomExercisesController {
    constructor(@Inject('CUSTOM_EXERCISE_SERVICE') private readonly customExerciseService: CustomExercisesService) {}

    @UseGuards(AuthenticatedGuard)
    @Get()
    getCustomExercises(){
        return this.customExerciseService.findCustomExercises();
    }
    @UseGuards(AuthenticatedGuard)
    @Get('id/:id')
    async getCustomExerciseById(@Param('id') id:string){
        return await this.customExerciseService.findCustomExerciseById(id)
    }
    @UseGuards(AuthenticatedGuard)
    @Post('custom-exercise')
    createCustomExercise(@Body() createCustomExerciseDto: CreateCustomExerciseDto, @Req() req:Request){
        const user: any = req.user
        createCustomExerciseDto.userId = user.id
        return this.customExerciseService.createCustomExercise(createCustomExerciseDto);
    }
    @UseGuards(AuthenticatedGuard)
    @Patch('custom-exercise/:id')
    async updateCustomExercise(@Param("id") id:string, @Body() createCustomExerciseDto: CreateCustomExerciseDto){
        const customExercise = await this.customExerciseService.findCustomExerciseById(id)
        return this.customExerciseService.updateCustomExercise(customExercise.id, createCustomExerciseDto)
    }
    @UseGuards(AuthenticatedGuard)
    @Delete('custom-exercise/:id')
    deleteCustomExercise(@Param("id") id:string){
        return this.customExerciseService.deleteCustomExercise(id)
    }
}
