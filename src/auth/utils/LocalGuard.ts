import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from 'express';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    async canActivate(context: ExecutionContext) {
        const result = (await super.canActivate(context) as boolean);
        console.log(result)
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return result;
    }

}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<any>{
        const req = context.switchToHttp().getRequest<Request>();
        console.log('Is Request Authenticated? ',req.isAuthenticated())
        return req.isAuthenticated();
    }
} 

