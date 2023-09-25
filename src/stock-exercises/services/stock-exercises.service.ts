import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStockExerciseDto } from 'src/stock-exercises/dtos/CreateStockExercise.dto';
import { StockExercise } from 'src/typeorm/entities/StockExercise';

@Injectable()
export class StockExercisesService {
    constructor(@InjectRepository(StockExercise) private ExerciseRepository: Repository<StockExercise>){}

    createExercise(createStockExerciseDto: CreateStockExerciseDto) {
        const newExercise = this.ExerciseRepository.create({...createStockExerciseDto})
        return this.ExerciseRepository.save(newExercise)
    }

    findExercises() {
        return this.ExerciseRepository.find()
    }

}
