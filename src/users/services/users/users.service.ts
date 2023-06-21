import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams } from 'src/utils/types';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private UserRepository: Repository<User>){}
    findUsers(){
        return this.UserRepository.find();
    }
    createUser(createUserDto: CreateUserDto){
        const newUser = this.UserRepository.create(createUserDto)
        return this.UserRepository.save(newUser);
    }
    findUserByEmail(email: string): Promise<User | undefined>{
        return this.UserRepository.findOne({where: {email}})
    }
    findUserById(id: number): Promise<User | undefined>{
        return this.UserRepository.findOne({where: {id}})
    }

}
