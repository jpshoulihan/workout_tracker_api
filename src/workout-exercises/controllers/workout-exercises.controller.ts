import { Body, Controller, Delete, Inject, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { CreateWorkoutExerciseDto } from 'src/workout-exercises/dtos/CreateWorkoutExerciseDto';
import { WorkoutExercisesService } from 'src/workout-exercises/services/workout-exercises.service';

@Controller('workout-exercises')
@ApiTags('Workout Exercises')
export class WorkoutExercisesController {
    constructor(@Inject('WORKOUT_EXERCISE_SERVICE') private readonly workoutExerciseService: WorkoutExercisesService) { }

    @UseGuards(AuthenticatedGuard)
    @Post('workout-exercise')
    @ApiOperation({ summary: 'Add an exercise to a workout' })
    @ApiResponse({ status: 201, description: 'Exercise added to workout', type: CreateWorkoutExerciseDto })
    async createWorkoutExercise(@Body() createWorkoutExerciseDto: CreateWorkoutExerciseDto) {
        return this.workoutExerciseService.createWorkoutExercise({ ...createWorkoutExerciseDto })
    }

    @UseGuards(AuthenticatedGuard)
    @Post('workout-exercises')
    @ApiOperation({ summary: 'Add an array of exercises to a workout' })
    @ApiResponse({ status: 201, description: 'Exercises added to workout', type: CreateWorkoutExerciseDto, isArray: true })
    async createWorkoutExercises(@Body() createWorkoutExerciseDto: CreateWorkoutExerciseDto[]) {
        return this.workoutExerciseService.createWorkoutExercises(createWorkoutExerciseDto)
    }

    @UseGuards(AuthenticatedGuard)
    @Delete('workout-exercise/:id')
    @ApiOperation({ summary: 'Delete an exercise from a workout' })
    @ApiResponse({ status: 201, description: 'Exercise deleted from workout', type: CreateWorkoutExerciseDto })
    async deleteWorkoutExercise(@Param("id") id: string) {
        return this.workoutExerciseService.deleteWorkoutExercise(id)
    }

    @UseGuards(AuthenticatedGuard)
    @Delete('workout-exercises/:id')
    @ApiOperation({ summary: 'Delete all exercises from a workout' })
    @ApiResponse({ status: 201, description: 'Exercises deleted from workout', type: CreateWorkoutExerciseDto })
    async deleteAllWorkoutExercises(@Param("id") id: string) {
        return this.workoutExerciseService.deleteAllWorkoutExercises(id)
    }
}
