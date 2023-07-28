import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { comparePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_SERVICE') private readonly userService: UsersService
    ){}


    async validateUser(email:string, password:string){
        console.log('Inside validateUser')
        const userDB = await this.userService.findUserByEmail(email);
        if(userDB){
            const match = comparePassword(password, userDB.password);
            if(match){
                console.log('User Validated');
                return userDB
            } else {
                console.log('Password did not match');
            }
        }
        return null;
    }
}
