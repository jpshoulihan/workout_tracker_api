import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'
import * as passport from 'passport'
import { TypeormStore } from 'connect-typeorm';
import { SessionEntity } from './typeorm/entities/Session';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const sessionRepository = app.get(DataSource).getRepository(SessionEntity)
  app.use(
    session({
      name: 'WORKOUT_TRACKER_SESSION_ID',
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 2 * 60 * 60 * 1000,
      },
      store: new TypeormStore({cleanupLimit:10}).connect(sessionRepository),
    })
  )
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(8000);
}
bootstrap();
