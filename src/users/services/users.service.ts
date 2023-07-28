import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { UpdateUserProfileDto } from 'src/users/dtos/UpdateUserProfile.dto';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private UserRepository: Repository<User>) { }
    findUsers() {
        return this.UserRepository.find();
    }
    createUser(createUserDto: CreateUserDto) {
        const password = encodePassword(createUserDto.password)
        const newUser = this.UserRepository.create({ ...createUserDto, password })
        return this.UserRepository.save(newUser);
    }
    findUserByEmail(email: string): Promise<User | undefined> {
        return this.UserRepository.findOne({ where: { email } })
    }
    findUserById(id: string): Promise<User | undefined> {
        return this.UserRepository.findOne({ where: { id } })
    }
    async updateProfile(id: string, updateUserProfileDto: UpdateUserProfileDto) {
        const user = await this.UserRepository.findOne({ where: { id } })
        const updateUserProfile = {...user, ...updateUserProfileDto}
        return this.UserRepository.save(updateUserProfile)
    }
}
