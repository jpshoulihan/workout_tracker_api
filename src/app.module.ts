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
import { Workout } from './typeorm/entities/Workout';
import { WorkoutsModule } from './workouts/workouts.module';
import { WorkoutExercise } from './typeorm/entities/WorkoutExercise';
import { WorkoutExercisesModule } from './workout-exercises/workout-exercises.module';
import { CustomExercisesModule } from './custom-exercises/custom-exercises.module';
import * as dotenv from 'dotenv';
import { CustomExercise } from './typeorm/entities/CustomExercise';
import { PassportModule } from '@nestjs/passport';
import { BaseExercise } from './typeorm/entities/BaseExercise';
import { BaseExercisesModule } from './base_exercises/base_exercises.module';
dotenv.config();

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [User, SessionEntity, Exercise, Workout, WorkoutExercise, CustomExercise, BaseExercise],
  }),
  PassportModule.register({session: true}),
  UsersModule, AuthModule, ExercisesModule, WorkoutsModule, WorkoutExercisesModule, CustomExercisesModule, BaseExercisesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
