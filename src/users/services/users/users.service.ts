import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private UserRepository: Repository<User>) { }
    findUsers() {
        return this.UserRepository.find();
    }
    createUser(createUserDto: CreateUserDto) {
        const password = encodePassword(createUserDto.password)
        console.log(password)
        const newUser = this.UserRepository.create({ ...createUserDto, password })
        return this.UserRepository.save(newUser);
    }
    findUserByEmail(email: string): Promise<User | undefined> {
        return this.UserRepository.findOne({ where: { email } })
    }
    findUserById(id: string): Promise<User | undefined> {
        return this.UserRepository.findOne({ where: { id } })
    }

}
