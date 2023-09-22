import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'
import * as passport from 'passport'
import { TypeormStore } from 'connect-typeorm';
import { SessionEntity } from './typeorm/entities/Session';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule)
  const sessionRepository = app.get(DataSource).getRepository(SessionEntity)

  // Enable CORS for your React frontend
  app.enableCors({
    origin: 'http://localhost:5173', // Replace with your frontend domain
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

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Workout Tracker API')
    .setDescription('The client must be registered and logged in to access endpoints')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document)

  await app.listen(8000);
}
bootstrap();
