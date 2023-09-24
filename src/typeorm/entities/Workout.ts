import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { WorkoutExercise } from "./WorkoutExercise";
import { CalendarEntry } from "./CalendarEntry";

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

    @OneToMany(() => WorkoutExercise, workoutExercise => workoutExercise.workout, {cascade: true})
    workoutExercises: WorkoutExercise[];
    
    @OneToMany(() => CalendarEntry, calendarEntry => calendarEntry.workout)
    calendarEntries: CalendarEntry[];
}