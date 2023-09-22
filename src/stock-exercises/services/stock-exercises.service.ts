import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from 'src/typeorm/entities/Exercise';
import { CreateStockExerciseDto } from 'src/stock-exercises/dtos/CreateStockExercise.dto';

@Injectable()
export class StockExercisesService {
    constructor(@InjectRepository(Exercise) private ExerciseRepository: Repository<Exercise>){}

    createExercise(createStockExerciseDto: CreateStockExerciseDto) {
        const newExercise = this.ExerciseRepository.create({...createStockExerciseDto})
        return this.ExerciseRepository.save(newExercise)
    }

    findExercises() {
        return this.ExerciseRepository.find()
    }

}
