import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutExercise } from 'src/typeorm/entities/WorkoutExercise';
import { CreateWorkoutExerciseDto } from 'src/workout-exercises/dtos/CreateWorkoutExerciseDto';
import { Repository } from 'typeorm';

@Injectable()
export class WorkoutExercisesService {
    constructor(@InjectRepository(WorkoutExercise) private WorkoutExerciseRepository: Repository<WorkoutExercise>) { }

    createWorkoutExercise(createWorkoutExerciseDto: CreateWorkoutExerciseDto) {
        const newWorkoutExercise = this.WorkoutExerciseRepository.create(
            {
                ...createWorkoutExerciseDto,
                workout: { id: createWorkoutExerciseDto.workoutId },
                exercise: { id: createWorkoutExerciseDto.exerciseId }
            })
            
        return this.WorkoutExerciseRepository.save(newWorkoutExercise)
    }
}
