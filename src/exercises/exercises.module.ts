import { Module } from '@nestjs/common';
import { ExercisesService } from './services/exercises.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExercisesController } from './controllers/exercises.controller';
import { Exercise } from 'src/typeorm/entities/Exercise';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise])],
  controllers: [ExercisesController],
  providers: [
    {
      provide: 'BASE_EXERCISES_SERVICE',
      useClass: ExercisesService
    }
  ]
})
export class ExercisesModule {}
