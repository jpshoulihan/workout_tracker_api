import { Module } from '@nestjs/common';
import { BaseExercisesService } from './services/base_exercises.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseExercisesController } from './controllers/base_exercises.controller';
import { BaseExercise } from 'src/typeorm/entities/BaseExercise';

@Module({
  imports: [TypeOrmModule.forFeature([BaseExercise])],
  controllers: [BaseExercisesController],
  providers: [
    {
      provide: 'BASE_EXERCISES_SERVICE',
      useClass: BaseExercisesService
    }
  ]
})
export class BaseExercisesModule {}
