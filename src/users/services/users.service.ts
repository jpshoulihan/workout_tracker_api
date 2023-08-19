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
    async findUserByEmail(email: string): Promise<User | undefined> {
        return this.UserRepository.findOne({ where: { email } })
    }
    async findeUserByUserName(username: string): Promise<User | undefined> {
        return this.UserRepository.findOne({ where: { username } })
    }
    async createUser(createUserDto: CreateUserDto) {
        const userExists = await this.findUserByEmail(createUserDto.email)

        if (userExists !== null)
            return {
                status: 'error',
                error: 409,
            }

        const password = encodePassword(createUserDto.password)
        const newUser = this.UserRepository.create({ ...createUserDto, password })
        return this.UserRepository.save(newUser);
    }
    findUserById(id: string): Promise<User | undefined> {
        return this.UserRepository.findOne({ where: { id } })
    }
    async updateProfile(id: string, updateUserProfileDto: UpdateUserProfileDto) {
        const user = await this.UserRepository.findOne({ where: { id } })

        if (updateUserProfileDto.username !== null) {
            const checkUserName = await this.findeUserByUserName(updateUserProfileDto.username)
            if (checkUserName !== null) {
                return {
                    status: 'error',
                    error: 409,
                }
            }
        }
        const updateUserProfile = { ...user, ...updateUserProfileDto }
        return this.UserRepository.save(updateUserProfile)
    }
}
