import { Controller, Post, UseGuards, Get, Session, Req } from '@nestjs/common';
import { AuthenticatedGuard, LocalAuthGuard } from 'src/auth/utils/LocalGuard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    //invoking guard to enforce protection
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(){
    }

    @Get('')
    async getAuthSession(@Session() session: Record<string, any>){
        //modifying the session intializes the session
        session.authenticated = true;
        console.log(session)
    }

    @UseGuards(AuthenticatedGuard)
    @Get('status')
    async getAuthStatus(@Req() req: Request){
        return req.user;
    }
}