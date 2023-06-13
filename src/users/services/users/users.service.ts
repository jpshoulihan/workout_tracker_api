import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams } from 'src/utils/types';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private UserRepository: Repository<User>){}
    findUsers(){
        return this.UserRepository.find();
    }
    createUser(userDetails: CreateUserParams){
        const newUser = this.UserRepository.create({...userDetails})
        return this.UserRepository.save(newUser);
    }
}
