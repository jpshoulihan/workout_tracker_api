import { ChildEntity, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Exercise } from "./Exercise";

@ChildEntity('custom_exercise')
export class CustomExercise extends Exercise {
    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    userId: User | null;
}