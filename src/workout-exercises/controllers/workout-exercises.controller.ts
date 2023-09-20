import { Body, Controller, Delete, Inject, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { CreateWorkoutExerciseDto } from 'src/workout-exercises/dtos/CreateWorkoutExerciseDto';
import { WorkoutExercisesService } from 'src/workout-exercises/services/workout-exercises.service';

@Controller('workout-exercises')
export class WorkoutExercisesController {
    constructor(@Inject('WORKOUT_EXERCISE_SERVICE') private readonly workoutExerciseService: WorkoutExercisesService){}

    @UseGuards(AuthenticatedGuard)
    @Post('workout-exercise')
    async createWorkoutExercise(@Body() createWorkoutExerciseDto: CreateWorkoutExerciseDto){
        return this.workoutExerciseService.createWorkoutExercise({...createWorkoutExerciseDto})
    }

    @UseGuards(AuthenticatedGuard)
    @Post('workout-exercises')
    async createWorkoutExercises(@Body() createWorkoutExerciseDto: CreateWorkoutExerciseDto[]){
        return this.workoutExerciseService.createWorkoutExercises(createWorkoutExerciseDto)
    }

    @UseGuards(AuthenticatedGuard)
    @Delete('workout-exercise/:id')
    async deleteWorkoutExercise(@Param("id") id: string){
        return this.workoutExerciseService.deleteWorkoutExercise(id)
    }

    @UseGuards(AuthenticatedGuard)
    @Delete('workout-exercises/:id')
    async deleteAllWorkoutExercises(@Param("id") id: string){
        return this.workoutExerciseService.deleteAllWorkoutExercises(id)
    }
}
