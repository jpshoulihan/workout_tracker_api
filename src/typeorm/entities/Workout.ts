import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({ name: 'workouts' })
export class Workout {
    @PrimaryGeneratedColumn()
    workoutId: number;

    @Column()
    workoutName: string;

    @ManyToOne(() => User, user => user.workouts)
    user: User;

    @Column({default: new Date()})
    createdAt: string;
}