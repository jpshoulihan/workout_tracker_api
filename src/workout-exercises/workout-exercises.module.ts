import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutExercise } from 'src/typeorm/entities/WorkoutExercise';
import { WorkoutExercisesController } from './controllers/workout-exercises/workout-exercises.controller';
import { WorkoutExercisesService } from './services/workout-exercises/workout-exercises.service';

@Module({
    imports: [TypeOrmModule.forFeature([WorkoutExercise])],
    controllers: [WorkoutExercisesController],
    providers: [
         {
            provide: 'WORKOUT_EXERCISE_SERVICE',
            useClass: WorkoutExercisesService,
        }
    ]
})
export class WorkoutExercisesModule { }
