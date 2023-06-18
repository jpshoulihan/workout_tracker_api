import { Body, Controller, Get, Post, Inject, Param, HttpException, HttpStatus, UseInterceptors, ClassSerializerInterceptor, ParseIntPipe } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { SerializedUser } from 'src/typeorm/entities';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound.exception';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {

    constructor(@Inject('USER_SERVICE') private readonly userService: UsersService){}
    @Get()
    async getUsers(){
        return (await this.userService.findUsers()).map(user => plainToClass(SerializedUser, user));
        
    }
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('email/:email')
    async getUserByEmail(@Param('email') email: string){
        const user = await this.userService.findUserByEmail(email);

        if(user) return new SerializedUser(user);
        else throw new HttpException('user not found', HttpStatus.BAD_REQUEST)
        
    }
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('id/:id')
    async getUserById(@Param('id', ParseIntPipe) id: number){
        const user = await this.userService.findUserById(id);

        if(user) return new SerializedUser(user);
        else throw new UserNotFoundException;
        
    }
    @Post()
    createUser(@Body() createUserDto: CreateUserDto){
        return this.userService.createUser(createUserDto);
    }
    @Post()
    login(): any{
        return{}
    }
}
