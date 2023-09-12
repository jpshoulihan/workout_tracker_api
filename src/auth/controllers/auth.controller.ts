import { Controller, Post, UseGuards, Get, Session, Req, Res} from '@nestjs/common';
import { AuthenticatedGuard, LocalAuthGuard } from 'src/auth/utils/LocalGuard';
import { SerializedUser } from 'src/typeorm/entities';
import { Request, Response } from 'express';
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

    // @UseGuards(AuthenticatedGuard)
    // @Get('status')
    // async getAuthStatus(@Req() req: Request){
    //     return req.isAuthenticated();
    // }

    @Get('status')
    async getAuthStatus(@Req() req: Request, @Res() res: Response): Promise<void> {
        if (req.isAuthenticated()) {
            // User is authenticated, return true
            res.status(200).json(true);
        } else {
            // User is not authenticated, return false
            res.status(200).json(false);
        }
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