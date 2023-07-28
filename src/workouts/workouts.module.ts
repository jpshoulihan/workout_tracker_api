import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout } from 'src/typeorm/entities/Workout';
import { WorkoutsController } from './controllers/workouts.controller';
import { WorkoutsService } from './services/workouts.service';

@Module({
    imports: [TypeOrmModule.forFeature([Workout])],
    controllers: [WorkoutsController],
    providers: [
        {
            provide: 'WORKOUT_SERVICE',
            useClass: WorkoutsService
        }
    ]
})

export class WorkoutsModule {}
