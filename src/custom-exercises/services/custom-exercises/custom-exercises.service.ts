import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomExerciseDto } from 'src/custom-exercises/dtos/CustomExerciseDto';
import { CustomExercise } from 'src/typeorm/entities/CustomExercise';
import { Repository } from 'typeorm';

@Injectable()
export class CustomExercisesService {
    constructor(@InjectRepository(CustomExercise) private CustomExerciseRepository: Repository<CustomExercise>){}

    createExercise(createCustomExercise: CreateCustomExerciseDto) {
        const newCustomExercise = this.CustomExerciseRepository.create({...createCustomExercise})
        return this.CustomExerciseRepository.save(newCustomExercise)
    }

    findCustomExercise(){
        return this.CustomExerciseRepository.find()
    }

    async updateCustomExercise(id:string, createCustomExercise:CreateCustomExerciseDto){
        const customExercise = await this.CustomExerciseRepository.findOne({where: {id}})
        const updateCustomExercise = {...customExercise, ...createCustomExercise}
        return this.CustomExerciseRepository.save(updateCustomExercise)
    }
}
