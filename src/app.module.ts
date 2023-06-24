import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SessionEntity } from './typeorm/entities/Session';
import { ExercisesModule } from './exercises/exercises.module';
import { Exercise } from './typeorm/entities/Exercise';

@Module({
  imports: [TypeOrmModule.forRoot({
    name: 'default',
    type:'postgres',
    url: 'postgres://unanihny:q7uYGdTWvc4vzV0KG-EJ7LP9PMjh9_q0@horton.db.elephantsql.com/unanihny',
    synchronize: true,
    logging: true,
    entities: [User, SessionEntity, Exercise],
  }), UsersModule, AuthModule, ExercisesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
