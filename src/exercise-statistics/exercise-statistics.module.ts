import { Module } from '@nestjs/common';
import { ExerciseStatisticsService } from './services/exercise-statistics.service';
import { ExerciseStatisticsController } from './controllers/exercise-statistics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseStatistic } from 'src/typeorm/entities/ExerciseStatistic';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseStatistic])],
  controllers: [ExerciseStatisticsController],
  providers: [
    {
      provide: 'EXERCISE_STATISTIC_SERVICE',
      useClass: ExerciseStatisticsService
    }
  ],
})
export class ExerciseStatisticsModule {}
