import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from 'src/typeorm/entities/Exercise';
import { Repository } from 'typeorm';

@Injectable()
export class ExercisesService {
    constructor(@InjectRepository(Exercise) private BaseExerciseRepository: Repository<Exercise>){}

    findBaseExercises() {
        return this.BaseExerciseRepository.find()
    }

    async deleteBaseExercise(id: string) {
        const deleteBaseExercise = await this.BaseExerciseRepository.createQueryBuilder('exercises')
            .delete()
            .from(Exercise)
            .where("id = :id", { id: id })
            .andWhere("category = :category", { category: 'custom_exercise' })
            .execute()

        return deleteBaseExercise
    }
}
