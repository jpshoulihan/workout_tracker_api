import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "src/typeorm/entities/User";
import { UsersService } from "src/users/services/users.service";

//class must define serialize & deserialize members of PassportSerialize
export class SessionSerializer extends PassportSerializer {
    constructor(
        @Inject('USER_SERVICE') private readonly userService: UsersService
    ) {
        super();
    };

    serializeUser(user: User, done: (err, user: User) => void) {
        console.log('Serialize User')
        done(null, user);
    }

    async deserializeUser(user: User, done: (error: Error, user: User) => void) {
        const userDB = await this.userService.findUserById(user.id)
        return userDB ? done(null, userDB) : done(null, null)
    }
}