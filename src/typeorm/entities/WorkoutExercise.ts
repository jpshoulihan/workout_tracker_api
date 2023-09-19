import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Workout } from "./Workout";
import { BaseExercise } from "./BaseExercise";

@Entity({name: 'workout_exercises'})
export class WorkoutExercise {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Workout, workout => workout.workoutExercises)
    workout: Workout

    @ManyToOne(() => BaseExercise, baseExercise => baseExercise.workoutExercises, {onDelete:'CASCADE'})
    @JoinColumn({name: 'baseExerciseId'})
    exercise: BaseExercise

    @Column()
    order: number; 
}