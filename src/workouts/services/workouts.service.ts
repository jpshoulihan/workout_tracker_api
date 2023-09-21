import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workout } from 'src/typeorm/entities/Workout';
import { CreateWorkoutDto } from 'src/workouts/dtos/CreateWorkout.dto';
import { UpdateWorkoutDto } from 'src/workouts/dtos/UpdateWorkout.dto';
import { Repository } from 'typeorm';

@Injectable()
export class WorkoutsService {
    constructor(
        @InjectRepository(Workout) private WorkoutRepository: Repository<Workout>,
    ) { }

    async findWorkouts(id: string) {
        return await this.WorkoutRepository.findBy({ user: { id: id } })
    }

    async createWorkout(createWorkoutDto: CreateWorkoutDto) {
        const newWorkout = this.WorkoutRepository.create({ ...createWorkoutDto, user: { id: createWorkoutDto.userId } })
        return this.WorkoutRepository.save(newWorkout)
    }

    async findWorkoutExercisesByWorkoutId(id: string) {
        const exercises = await this.WorkoutRepository.createQueryBuilder('workout')
            .leftJoinAndSelect('workout.workoutExercises', 'workoutExercises')
            .leftJoinAndSelect('workoutExercises.exercise', 'exercise')
            .where('workout.id = :id', { id: id })
            .getMany();

        return exercises;
    }

    async updateWorkoutById(id: string, updateWorkoutDto: UpdateWorkoutDto) {
        const workout = await this.WorkoutRepository.findOne({ where: { id } })
        if (workout) {
            const updateWorkout = { ...workout, ...updateWorkoutDto }
            return this.WorkoutRepository.save(updateWorkout)
        }
        return { Error: `Workout not found` }
    }

    async deleteWorkoutById(id: string) {
        const workout = await this.WorkoutRepository.findOne({ where: { id } })
        if(workout){
            return this.WorkoutRepository.createQueryBuilder('workouts')
            .delete()
            .from(Workout)
            .where("id = :id", { id: id })
            .execute()
        }

        return { Error: `Workout not found` }
    }
}
