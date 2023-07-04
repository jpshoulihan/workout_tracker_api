import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WorkoutExercise } from "./WorkoutExercise";

export type ActionType = 'push' | 'pull'

export type BodySplitType =  'upper' | 'lower'

@Entity({name: 'custom_exercises'})
export class CustomExercise {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({type: 'enum', enum: ['upper', 'lower'], default: 'upper'})
    bodySplit: string;

    @Column({type: 'enum', enum: ['push', 'pull'], default: 'push'})
    action: ActionType

    @Column('string')
    equipment: string;
    
    @Column()
    exerciseName: string;

    @Column()
    instruction: string;

    @OneToMany(() => WorkoutExercise, workoutExercise => workoutExercise.customExercise)
    workoutExercises: WorkoutExercise[];
}