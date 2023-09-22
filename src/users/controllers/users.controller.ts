import { Body, Controller, Get, Post, Inject, Param, HttpException, HttpStatus, UseInterceptors, ClassSerializerInterceptor, ParseIntPipe, UsePipes, ValidationPipe, UseGuards, Patch, Req } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { SerializedUser } from 'src/typeorm/entities';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound.exception';
import { UsersService } from 'src/users/services/users.service';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { UpdateUserProfileDto } from 'src/users/dtos/UpdateUserProfile.dto';
import { Request } from 'express';
import { ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {

    constructor(@Inject('USER_SERVICE') private readonly userService: UsersService){}
    @UseGuards(AuthenticatedGuard)
    @Get()
    @ApiExcludeEndpoint()
    async getUsers(){
        return (await this.userService.findUsers()).map(user => plainToClass(SerializedUser, user));
        
    }
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('email/:email')
    @ApiExcludeEndpoint()
    async getUserByEmail(@Param('email') email: string){
        const user = await this.userService.findUserByEmail(email);

        if(user) return new SerializedUser(user);
        else throw new HttpException('user not found', HttpStatus.BAD_REQUEST)
        
    }
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('id/:id')
    @ApiExcludeEndpoint()
    async getUserById(@Param('id', ParseIntPipe) id: string){
        const user = await this.userService.findUserById(id);

        if(user) return new SerializedUser(user);
        else throw new UserNotFoundException;
        
    }
    //this invokes our validation from the user dto
    //update to check unique on email
    @UsePipes(ValidationPipe)
    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({status: 201, description: 'User Registered', type: CreateUserDto})
    async createUser(@Body() createUserDto: CreateUserDto){
        return await this.userService.createUser(createUserDto);
    }
    @UseGuards(AuthenticatedGuard)
    @Patch('profile')
    @ApiOperation({ summary: 'Update user profile' })
    @ApiResponse({status: 201, description: 'Updated user details', type: UpdateUserProfileDto})
    async updateUserProfile(@Body() updateUserProfileDto: UpdateUserProfileDto, @Req() req: Request){
        const user: any = req.user
        const updateUserProfile = await this.userService.updateProfile(user.id, updateUserProfileDto);
        return updateUserProfile
    }
}
