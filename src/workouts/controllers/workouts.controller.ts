import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { CreateWorkoutDto } from 'src/workouts/dtos/CreateWorkout.dto';
import { UpdateWorkoutDto } from 'src/workouts/dtos/UpdateWorkout.dto'
import { WorkoutsService } from 'src/workouts/services/workouts.service';
import { Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('workouts')
@ApiTags('Workouts')
export class WorkoutsController {
    constructor(@Inject('WORKOUT_SERVICE') private readonly workoutService: WorkoutsService){}
    
    @UseGuards(AuthenticatedGuard)
    @Get()
    @ApiOperation({ summary: 'Return workouts' })
    @ApiResponse({status: 201, description: 'All workouts returned', type: CreateWorkoutDto, isArray: true})
    async getWorkouts(@Req() req: Request){
        const user: any = req.user
        return await this.workoutService.findWorkouts(user.id)
    }
    @UseGuards(AuthenticatedGuard)
    @Get(':id')
    @ApiOperation({ summary: 'Return workout by id. Associated exercises returned if applicable' })
    @ApiResponse({status: 201, description: 'Workout returned by id', type: CreateWorkoutDto})
    async getWorkoutExercisesByWorkoutId(@Param('id') id: string){
        return await this.workoutService.findWorkoutExercisesByWorkoutId(id)
    }
    @UseGuards(AuthenticatedGuard)
    @Post('workout')
    @ApiOperation({ summary: 'Create a workout' })
    @ApiResponse({status: 201, description: 'Workout created', type: CreateWorkoutDto})
    async createWorkout(@Body() createWorkoutDto: CreateWorkoutDto, @Req() req: Request){
        const user: any = req.user
        createWorkoutDto.userId = user.id
        console.log(createWorkoutDto)
        return this.workoutService.createWorkout({...createWorkoutDto})
    }
    @UseGuards(AuthenticatedGuard)
    @Patch('workout/:id')
    @ApiOperation({ summary: 'Update workout name' })
    @ApiResponse({status: 201, description: 'Updated name returned', type: UpdateWorkoutDto})
    async updateWorkoutById(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto){
        const updateWorkout = await this.workoutService.updateWorkoutById(id, updateWorkoutDto);
        return updateWorkout
    }
    @UseGuards(AuthenticatedGuard)
    @Delete('workout/:id')
    @ApiOperation({ summary: 'Delete workout and all associated exercises by workout id' })
    @ApiResponse({status: 201, description: 'workout deleted'})
    async deleteWorkoutById(@Param('id') id: string){
        const deleteWorkout = await this.workoutService.deleteWorkoutById(id)
        return deleteWorkout
    }
}

