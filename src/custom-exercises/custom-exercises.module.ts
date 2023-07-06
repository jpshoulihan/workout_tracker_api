import { Module } from '@nestjs/common';
import { CustomExercise } from 'src/typeorm/entities/CustomExercise';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomExercisesService } from './services/custom-exercises/custom-exercises.service';
import { CustomExercisesController } from './controllers/custom-exercises/custom-exercises.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CustomExercise])],
  controllers: [CustomExercisesController],
  providers: [
    {
      provide: 'CUSTOM_EXERCISE_SERVICE',
      useClass: CustomExercisesService
    }
  ]
})
export class CustomExercisesModule {}
