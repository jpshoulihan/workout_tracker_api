import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Exercise } from "./Exercise";
import { Workout } from "./Workout";

@Entity({name: 'workout_exercises'})
export class WorkoutExercise {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Workout, workout => workout.workoutExercises)
    workout: Workout

    @ManyToOne(() => Exercise, exercise => exercise.workoutExercises)
    exercise: Exercise

    @Column()
    order: number; 
}