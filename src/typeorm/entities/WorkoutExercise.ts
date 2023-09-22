import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Workout } from "./Workout";
import { Exercise } from "./Exercise";

@Entity({name: 'workout_exercises'})
export class WorkoutExercise {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Workout, workout => workout.workoutExercises, {onDelete:'CASCADE'})
    workout: Workout

    @ManyToOne(() => Exercise, exercise => exercise.workoutExercises, {onDelete:'CASCADE'})
    @JoinColumn({name: 'baseExerciseId'})
    exercise: Exercise
}