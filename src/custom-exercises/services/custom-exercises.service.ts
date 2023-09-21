import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomExerciseDto } from 'src/custom-exercises/dtos/CustomExerciseDto';
import { UpdateCustomExerciseDto } from 'src/custom-exercises/dtos/UpdateCustomExerciseDto';
import { CustomExercise } from 'src/typeorm/entities/CustomExercise';
import { Repository } from 'typeorm';

@Injectable()
export class CustomExercisesService {
    constructor(@InjectRepository(CustomExercise) private CustomExerciseRepository: Repository<CustomExercise>) { }

    createCustomExercise(createCustomExerciseDto: CreateCustomExerciseDto) {
        const newCustomExercise = this.CustomExerciseRepository.create({ ...createCustomExerciseDto, userId: { id: createCustomExerciseDto.userId } })
        return this.CustomExerciseRepository.save(newCustomExercise)
    }
    findCustomExercises() {
        return this.CustomExerciseRepository.find()
    }
    async findCustomExerciseById(id: string) {
        const customExercise = await this.CustomExerciseRepository.findOne({ where: { id } })
        return customExercise
    }
    async updateCustomExercise(id: string, updateCustomExerciseDto: UpdateCustomExerciseDto) {
        const customExercise = await this.CustomExerciseRepository.findOne({ where: { id } })
        const updatedCustomExercise = { ...customExercise, ...updateCustomExerciseDto }
        return this.CustomExerciseRepository.save(updatedCustomExercise)
    }
    async deleteCustomExercise(id: string) {
        const deleteCustomExercise = await this.CustomExerciseRepository.createQueryBuilder('custom_exercises')
            .delete()
            .from(CustomExercise)
            .where("id = :id", { id: id })
            .execute()

        return deleteCustomExercise
    }
}
