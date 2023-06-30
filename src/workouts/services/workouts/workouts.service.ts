import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workout } from 'src/typeorm/entities/Workout';
import { CreateWorkoutDto } from 'src/workouts/dtos/CreateWorkout.dto';
import { Repository } from 'typeorm';

@Injectable()
export class WorkoutsService {
    constructor(
        @InjectRepository(Workout) private WorkoutRepository: Repository<Workout>,
    ) { }

    async findWorkouts(id: string){
        return await this.WorkoutRepository.findBy({user: {id: id}})
    }

    async createWorkout(createWorkoutDto: CreateWorkoutDto){
        const newWorkout = this.WorkoutRepository.create({ ...createWorkoutDto, user: {id: createWorkoutDto.userId} })
        return this.WorkoutRepository.save(newWorkout)
    }

    async findWorkoutExercisesByWorkoutId(id:string) {
        const exercises = await this.WorkoutRepository.createQueryBuilder('workout')
        .leftJoinAndSelect('workout.workoutExercises', 'workoutExercises')
        .leftJoinAndSelect('workoutExercises.exercise', 'exercise')
        .where('workout.id = :id', { id: id })
        .getMany();
    
      return exercises;
    }
}
