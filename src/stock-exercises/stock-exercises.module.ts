import { Module } from '@nestjs/common';
import { StockExercisesService } from './services/stock-exercises.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from 'src/typeorm/entities/Exercise';
import { StockExercisesController } from './controllers/stock-exercises.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Exercise])],
  controllers: [StockExercisesController],
  providers: [
    {
      provide:'STOCK_EXERCISES_SERVICE',
      useClass:StockExercisesService, 
    }
  ]
})
export class StockExercisesModule {}
