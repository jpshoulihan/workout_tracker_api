import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseExercise } from 'src/typeorm/entities/BaseExercise';
import { Repository } from 'typeorm';

@Injectable()
export class BaseExercisesService {
    constructor(@InjectRepository(BaseExercise) private BaseExerciseRepository: Repository<BaseExercise>){}

    async deleteBaseExercise(id: string) {
        const deleteBaseExercise = await this.BaseExerciseRepository.createQueryBuilder('base_exercises')
            .delete()
            .from(BaseExercise)
            .where("id = :id", { id: id })
            .andWhere("category = :category", { category: 'custom_exercise' })
            .execute()

        return deleteBaseExercise
    }
}
