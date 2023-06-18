import { HttpException, HttpStatus } from "@nestjs/common"

//writing custom exceptions
export class UserNotFoundException extends HttpException{
    constructor(message?: string, status?: HttpStatus){
        super(message || 'User Not Found', status || HttpStatus.BAD_REQUEST);
    }
}