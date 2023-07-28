import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { CreateExerciseDto } from 'src/exercises/dtos/CreateExercise.dto';
import { ExercisesService } from 'src/exercises/services/exercises.service';

@Controller('exercises')
export class ExercisesController {
    constructor(@Inject('EXERCISE_SERVICE') private readonly exerciseService: ExercisesService) {}

    @Post('exercise')
    createExercise(@Body() createExerciseDto: CreateExerciseDto){
        return this.exerciseService.createExercise(createExerciseDto);
    }

    @UseGuards(AuthenticatedGuard)
    @Get()
    getExercises(){
        return this.exerciseService.findExercises()
    }
}
