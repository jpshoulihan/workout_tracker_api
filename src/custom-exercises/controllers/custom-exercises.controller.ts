import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CreateCustomExerciseDto } from 'src/custom-exercises/dtos/CustomExerciseDto';
import { CustomExercisesService } from 'src/custom-exercises/services/custom-exercises.service';
import {Request} from 'express'
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('custom-exercises')
@ApiTags('Custom Exercises')
export class CustomExercisesController {
    constructor(@Inject('CUSTOM_EXERCISE_SERVICE') private readonly customExerciseService: CustomExercisesService) {}

    @UseGuards(AuthenticatedGuard)
    @Get()
    @ApiOperation({ summary: 'Returns all custom exercises' })
    @ApiResponse({status: 201, description: 'Custom exercises returned', type: CreateCustomExerciseDto, isArray:true})
    getCustomExercises(){
        return this.customExerciseService.findCustomExercises();
    }
    @UseGuards(AuthenticatedGuard)
    @Get(':id')
    @ApiOperation({ summary: 'Returns custom exercise by id' })
    @ApiResponse({status: 201, description: 'Custom exercise returned', type: CreateCustomExerciseDto, isArray:true})
    async getCustomExerciseById(@Param('id') id:string){
        return await this.customExerciseService.findCustomExerciseById(id)
    }
    @UseGuards(AuthenticatedGuard)
    @Post('custom-exercise')
    @ApiOperation({ summary: 'Add a custom exercise' })
    @ApiResponse({status: 201, description: 'Custom exercise added', type: CreateCustomExerciseDto})
    createCustomExercise(@Body() createCustomExerciseDto: CreateCustomExerciseDto, @Req() req:Request){
        const user: any = req.user
        createCustomExerciseDto.userId = user.id
        return this.customExerciseService.createCustomExercise(createCustomExerciseDto);
    }
    @UseGuards(AuthenticatedGuard)
    @Patch('custom-exercise/:id')
    @ApiOperation({ summary: 'Update a custom exercise' })
    @ApiResponse({status: 201, description: 'Custom exercise updated', type: CreateCustomExerciseDto})
    async updateCustomExercise(@Param("id") id:string, @Body() createCustomExerciseDto: CreateCustomExerciseDto){
        const customExercise = await this.customExerciseService.findCustomExerciseById(id)
        return this.customExerciseService.updateCustomExercise(customExercise.id, createCustomExerciseDto)
    }
    @UseGuards(AuthenticatedGuard)
    @Delete('custom-exercise/:id')
    @ApiOperation({ summary: 'Delete a custom exercise. Removes deleted custom exercise from user workout, if applicable' })
    @ApiResponse({status: 201, description: 'Custom exercise deleted'})
    deleteCustomExercise(@Param("id") id:string){
        return this.customExerciseService.deleteCustomExercise(id)
    }
}
