import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
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
        createWorkoutDto.userId = user.id
        console.log(createWorkoutDto)
        return this.workoutService.createWorkout({...createWorkoutDto})
    }

    @UseGuards(AuthenticatedGuard)
    @Get()
    async getWorkouts(@Req() req: Request){
        const user: any = req.user
        return await this.workoutService.findWorkouts(user.id)
    }
}

