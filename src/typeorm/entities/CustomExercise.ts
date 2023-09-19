import { ChildEntity, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { BaseExercise } from "./BaseExercise";

@ChildEntity('custom_exercise')
export class CustomExercise extends BaseExercise {
    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    userId: User | null;
}