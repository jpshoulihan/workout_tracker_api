import { Controller, Post, UseGuards, Get, Session, Req, Res, Body} from '@nestjs/common';
import { AuthenticatedGuard, LocalAuthGuard } from 'src/auth/utils/LocalGuard';
import { SerializedUser } from 'src/typeorm/entities';
import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { ApiExcludeEndpoint, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
    //invoking guard to enforce protection
    // @UseGuards(LocalAuthGuard)
    // @Post('login')
    // @ApiOperation({ summary: 'User login' })
    // @ApiResponse({status: 201, description: 'User session begins'})
    // @ApiParam({ name: 'username', description: 'Username for login' })
    // @ApiParam({ name: 'password', description: 'Password for login' })
    // async login(@Req() req: Request){
    //     return plainToClass(SerializedUser, req.user)
    // }

     //invoking guard to enforce protection
     @UseGuards(LocalAuthGuard)
     @Post('login')
     @ApiOperation({ summary: 'User login' })
     @ApiResponse({status: 201, description: 'User session begins', type: CreateUserDto})
     async login(@Body() loginDto: CreateUserDto){
         return plainToClass(SerializedUser, loginDto)
     }

    @Get('')
    @ApiExcludeEndpoint()
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
    @ApiOperation({ summary: 'Authentication check' })
    @ApiResponse({status: 201, description: 'Returns true if Authenticated, else false'})
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
    @ApiOperation({ summary: 'User logout' })
    @ApiResponse({status: 201, description: 'Session destroyed'})
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