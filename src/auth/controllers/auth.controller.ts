import { Controller, Post, UseGuards, Get, Session, Req } from '@nestjs/common';
import { AuthenticatedGuard, LocalAuthGuard } from 'src/auth/utils/LocalGuard';
import { SerializedUser } from 'src/typeorm/entities';
import { Request } from 'express';
import { plainToClass } from 'class-transformer';

@Controller('auth')
export class AuthController {
    //invoking guard to enforce protection
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: Request){
        return plainToClass(SerializedUser, req.user)
    }

    @Get('')
    async getAuthSession(@Session() session: Record<string, any>){
        //modifying the session intializes the session
        session.authenticated = true;
    }

    @UseGuards(AuthenticatedGuard)
    @Get('status')
    async getAuthStatus(@Req() req: Request){
        return req.isAuthenticated();
    }

    @Get('logout')
    async logout(@Req() request: Request) {
        request.session.destroy((err) => {
            if (err) {
              // Handle any error that may occur during logout
              console.error('Logout error:', err);
              return { message: 'Error during logout' };
            }
            return { message: 'Logged out successfully' };
          });
        }
}