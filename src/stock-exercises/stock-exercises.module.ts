import { Module } from '@nestjs/common';
import { StockExercisesService } from './services/stock-exercises.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockExercisesController } from './controllers/stock-exercises.controller';
import { StockExercise } from 'src/typeorm/entities/StockExercise';

@Module({
  imports:[TypeOrmModule.forFeature([StockExercise])],
  controllers: [StockExercisesController],
  providers: [
    {
      provide:'STOCK_EXERCISES_SERVICE',
      useClass:StockExercisesService, 
    }
  ]
})
export class StockExercisesModule {}
