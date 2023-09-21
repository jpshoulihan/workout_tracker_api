import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { CreateWorkoutDto } from 'src/workouts/dtos/CreateWorkout.dto';
import { UpdateWorkoutDto } from 'src/workouts/dtos/UpdateWorkout.dto'
import { WorkoutsService } from 'src/workouts/services/workouts.service';
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

    @UseGuards(AuthenticatedGuard)
    @Get('id/:id')
    async getWorkoutExercisesByWorkoutId(@Param('id') id: string){
        return await this.workoutService.findWorkoutExercisesByWorkoutId(id)
    }

    @UseGuards(AuthenticatedGuard)
    @Patch('workout/:id')
    async updateWorkoutById(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto){
        const updateWorkout = await this.workoutService.updateWorkoutById(id, updateWorkoutDto);
        return updateWorkout
    }

    @UseGuards(AuthenticatedGuard)
    @Delete('workout/:id')
    async deleteWorkoutById(@Param('id') id: string){
        const deleteWorkout = await this.workoutService.deleteWorkoutById(id)
        return deleteWorkout
    }
}

