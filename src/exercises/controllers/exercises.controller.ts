import { Controller, Inject, Delete, UseGuards, Param, Get } from '@nestjs/common';
import { ExercisesService } from '../services/exercises.service';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExerciseDto } from '../dtos/ExerciseDto';

@Controller('exercises')
@ApiTags('All Exercises (custom and stock)')
export class ExercisesController {
    constructor(@Inject('BASE_EXERCISES_SERVICE') private readonly exercisesService: ExercisesService ){}

    @UseGuards(AuthenticatedGuard)
    @Get()
    @ApiOperation({ summary: "Returns all exercises. Includes all stock exercises and user's custom exercises" })
    @ApiResponse({status: 201, description: 'All exercises returned', type: ExerciseDto, isArray: true})
    getCustomExercises(){
        return this.exercisesService.findBaseExercises();
    }

    @UseGuards(AuthenticatedGuard)
    @Delete('custom-exercise/:id')
    @ApiExcludeEndpoint()
    deleteCustomExercise(@Param("id") id:string){
        return this.exercisesService.deleteBaseExercise(id)
    }
}
