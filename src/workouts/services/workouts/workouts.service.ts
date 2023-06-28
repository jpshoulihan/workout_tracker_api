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

    async createWorkout(createWorkoutDto: CreateWorkoutDto){
        const newWorkout = this.WorkoutRepository.create({ ...createWorkoutDto, user: {id: createWorkoutDto.userId} })
        return this.WorkoutRepository.save(newWorkout)
    }
}
