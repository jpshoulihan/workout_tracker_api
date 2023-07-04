import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Exercise } from "./Exercise";
import { Workout } from "./Workout";
import { CustomExercise } from "./CustomExercise";

@Entity({name: 'workout_exercises'})
export class WorkoutExercise {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Workout, workout => workout.workoutExercises)
    workout: Workout

    @ManyToOne(() => Exercise, exercise => exercise.workoutExercises)
    exercise: Exercise
    
    @ManyToOne(() => CustomExercise, customExercise => customExercise.workoutExercises)
    customExercise: CustomExercise

    @Column()
    order: number; 
}