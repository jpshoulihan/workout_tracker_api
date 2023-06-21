import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth/auth.service";
import { Inject, UnauthorizedException } from "@nestjs/common";


export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthService){
        //Strategy default is username validation change in super to email
        super({
            usernameField: 'email'
    });
    }

    async validate(email: string, password:string){
        console.log('Inside LocalStrategy.validate')
        console.log(email)
        console.log(password)
        const user = await this.authService.validateUser(email, password);
        if(!user){
            throw new UnauthorizedException();
        }
        console.log(user)
        return user;
    }
}