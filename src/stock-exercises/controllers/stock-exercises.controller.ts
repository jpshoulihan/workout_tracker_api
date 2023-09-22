import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { CreateStockExerciseDto } from 'src/stock-exercises/dtos/CreateStockExercise.dto';
import { StockExercisesService } from 'src/stock-exercises/services/stock-exercises.service';

@Controller('stock-exercises')
@ApiTags('Stock Exercises')
export class StockExercisesController {
    constructor(@Inject('STOCK_EXERCISES_SERVICE') private readonly exerciseService: StockExercisesService) {}

    @Post('stock-exercise')
    @ApiExcludeEndpoint()
    createExercise(@Body() createStockExerciseDto: CreateStockExerciseDto){
        return this.exerciseService.createExercise(createStockExerciseDto);
    }

    @UseGuards(AuthenticatedGuard)
    @Get()
    @ApiOperation({ summary: 'Returns all stock exercises' })
    @ApiResponse({status: 201, description: '', isArray:true})
    getExercises(){
        return this.exerciseService.findExercises()
    }
}
