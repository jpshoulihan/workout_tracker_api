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
    async canActivate(context: ExecutionContext): Promise<boolean>{
        const req = context.switchToHttp().getRequest<Request>();
        return req.isAuthenticated();
    }
} 


// @Injectable()
// export class AuthenticatedGuard extends AuthGuard('local') implements CanActivate {
//   async canActivate(context: ExecutionContext): Promise<any> {
//     const canActivate = await super.canActivate(context);
//     if (canActivate) {
//       const request = context.switchToHttp().getRequest();
//       request.user = request.user; // Assign the user object to the request
//     }
//     return canActivate;
//   }
// }

// @Injectable()
// export class AuthenticatedGuard implements CanActivate {
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const req = context.switchToHttp().getRequest<Request>();
//     const sessionData = req.session;

//     if (sessionData && sessionData.passport && sessionData.passport.user) {
//       const userId = sessionData.passport.user.id;
//       req.user = { id: userId }; // Attach the user object to the request

//       return true;
//     }

//     return false;
//   }
// }



