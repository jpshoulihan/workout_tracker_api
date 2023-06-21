import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { ValidateUserMiddleware } from 'src/middlewares/validate-user.middlewares';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    }
  ]
})

//pass individual routes or entire contoller to validation middleware   
export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(ValidateUserMiddleware).forRoutes(
      {
        path: 'users/:email',
        method:RequestMethod.GET
      }
    )
  }
 }
