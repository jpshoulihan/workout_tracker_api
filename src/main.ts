import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'
import * as passport from 'passport'
import { TypeormStore } from 'connect-typeorm';
import { SessionEntity } from './typeorm/entities/Session';
import { DataSource } from 'typeorm';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule)
  const sessionRepository = app.get(DataSource).getRepository(SessionEntity)

  const config = new DocumentBuilder()
    .setTitle('Workout Tracker')
    .setDescription('Work in progress')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build();
  
    const options: SwaggerDocumentOptions = {
      operationIdFactory: (
          controllerKey: string,
          methodKey: string
      ) => methodKey
  };
  
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  app.use(
    session({
      name: 'WORKOUT_TRACKER_SESSION_ID',
      secret: process.env.SECRET,
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
