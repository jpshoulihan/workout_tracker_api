import { Column, Entity, OneToMany, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import { WorkoutExercise } from "./WorkoutExercise";

export type BodySplitType = 'upper' | 'lower'
export type ActionType = 'push' | 'pull'

@Entity('base_exercises')
@TableInheritance({ column: { type: "varchar", name: "category" } })
export class BaseExercise {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'enum', enum: ['upper', 'lower'], default: 'upper' })
    bodySplit: BodySplitType

    @Column({ type: 'enum', enum: ['push', 'pull'], default: 'push' })
    action: ActionType

    @Column()
    equipment: string;

    @Column()
    exerciseName: string;

    @Column()
    instruction: string;

    @OneToMany(() => WorkoutExercise, workoutExercise => workoutExercise.exercise, { cascade: true })
    workoutExercises: WorkoutExercise[];
}


