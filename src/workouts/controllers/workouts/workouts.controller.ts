import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { CreateWorkoutDto } from 'src/workouts/dtos/CreateWorkout.dto';
import { WorkoutsService } from 'src/workouts/services/workouts/workouts.service';
import { Request } from 'express';

@Controller('workouts')
export class WorkoutsController {
    constructor(@Inject('WORKOUT_SERVICE') private readonly workoutService: WorkoutsService){}
    
    @UseGuards(AuthenticatedGuard)
    @Post('workout')
    async createWorkout(@Body() createWorkoutDto: CreateWorkoutDto, @Req() req: Request){
        const user: any = req.user
        console.log('User ID before adding: ', user.id)
        createWorkoutDto.userId = user.id
        console.log('User ID Added:', createWorkoutDto.userId)
        console.log(createWorkoutDto)
        return this.workoutService.createWorkout({...createWorkoutDto})
    }
}

