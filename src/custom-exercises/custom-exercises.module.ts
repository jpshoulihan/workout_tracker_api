import { Module } from '@nestjs/common';
import { CustomerExercisesController } from './customer-exercises/customer-exercises.controller';
import { CustomerExercisesController } from './controllers/customer-exercises/customer-exercises.controller';
import { Controller } from './controllers/customer-exercises/.controller';
import { CustomExercisesController } from './controllers/customer-exercises/custom-exercises/custom-exercises.controller';
import { CustomerExercisesController } from './controllers/customer-exercises/customer-exercises.controller';

@Module({
  controllers: [CustomerExercisesController, Controller, CustomExercisesController],
  providers: []
})
export class CustomExercisesModule {}
