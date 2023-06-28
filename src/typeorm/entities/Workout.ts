import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({ name: 'workouts' })
export class Workout {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    workoutName: string;
    
    @Column({default: new Date()})
    createdAt: string;
    
    @ManyToOne(() => User, user => user.workouts)
    user: User;
}