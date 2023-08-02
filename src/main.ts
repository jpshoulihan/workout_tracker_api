import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'
import * as passport from 'passport'
import { TypeormStore } from 'connect-typeorm';
import { SessionEntity } from './typeorm/entities/Session';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule)
  const sessionRepository = app.get(DataSource).getRepository(SessionEntity)

  // Enable CORS for your React frontend
  app.enableCors({
    origin: 'http://localhost:3000', // Replace with your frontend domain
    credentials: true,
  });
  
  app.use(
    session({
      name: 'WORKOUT_TRACKER_SESSION_ID',
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 7200000,
        sameSite: 'lax'
      },
      store: new TypeormStore().connect(sessionRepository),
    })
  )

  app.use(passport.initialize());
  app.use(passport.session());


  await app.listen(8000);
}
bootstrap();
