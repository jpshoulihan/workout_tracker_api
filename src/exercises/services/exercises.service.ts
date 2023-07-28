import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from 'src/typeorm/entities/Exercise';
import { CreateExerciseDto } from 'src/exercises/dtos/CreateExercise.dto';

@Injectable()
export class ExercisesService {
    constructor(@InjectRepository(Exercise) private ExerciseRepository: Repository<Exercise>){}

    createExercise(createExerciseDto: CreateExerciseDto) {
        const newExercise = this.ExerciseRepository.create({...createExerciseDto})
        return this.ExerciseRepository.save(newExercise)
    }

    findExercises() {
        return this.ExerciseRepository.find()
    }

}
