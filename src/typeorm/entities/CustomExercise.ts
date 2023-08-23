import { ChildEntity, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { BaseExercise } from "./BaseExercise";

@ChildEntity()
export class CustomExercise extends BaseExercise{
    @ManyToOne(() => User)
    @JoinColumn({name: 'user_id'})
    userId: User | null;
}