import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WorkoutExercise } from "./WorkoutExercise";
import { User } from "./User";

export type ActionType = 'push' | 'pull'

export type BodySplitType =  'upper' | 'lower'

@Entity({name: 'custom_exercises'})
export class CustomExercise {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({type: 'enum', enum: ['upper', 'lower'], default: 'upper'})
    bodySplit: BodySplitType;

    @Column({type: 'enum', enum: ['push', 'pull'], default: 'push'})
    action: ActionType

    @Column()
    equipment: string;
    
    @Column()
    exerciseName: string;

    @Column()
    instruction: string;

    @OneToMany(() => WorkoutExercise, workoutExercise => workoutExercise.customExercise)
    workoutExercises: WorkoutExercise[];

    @ManyToOne(() => User, user => user.customExercises)
    user: User;
}