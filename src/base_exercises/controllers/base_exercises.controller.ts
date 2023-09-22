import { Controller, Inject, Delete, UseGuards, Param, Get } from '@nestjs/common';
import { BaseExercisesService } from '../services/base_exercises.service';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';

@Controller('base-exercises')
export class BaseExercisesController {
    constructor(@Inject('BASE_EXERCISES_SERVICE') private readonly baseExercisesService: BaseExercisesService ){}

    @UseGuards(AuthenticatedGuard)
    @Get()
    getCustomExercises(){
        return this.baseExercisesService.findBaseExercises();
    }

    @UseGuards(AuthenticatedGuard)
    @Delete('custom-exercise/:id')
    deleteCustomExercise(@Param("id") id:string){
        return this.baseExercisesService.deleteBaseExercise(id)
    }
}
