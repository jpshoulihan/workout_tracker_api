import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    name: 'default',
    type:'postgres',
    url: 'postgres://unanihny:q7uYGdTWvc4vzV0KG-EJ7LP9PMjh9_q0@horton.db.elephantsql.com/unanihny',
    synchronize: true,
    logging: true,
    entities: [User],
  }), UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
