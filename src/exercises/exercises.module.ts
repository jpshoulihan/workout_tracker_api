import { Module } from '@nestjs/common';
import { ExercisesService } from './services/exercises/exercises.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from 'src/typeorm/entities/Exercise';
import { ExercisesController } from './controllers/exercises/exercises.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Exercise])],
  controllers: [ExercisesController],
  providers: [
    {
      provide:'EXERCISE_SERVICE',
      useClass:ExercisesService, 
    }
  ]
})
export class ExercisesModule {}
