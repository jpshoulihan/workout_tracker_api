import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class ValidateUserMiddleware implements NestMiddleware{
    use(req: Request, res:  Response, next: NextFunction){
        console.log('Hello World, This is the Nest.js Middleware\n');
        next();
    }
}