import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Workout } from "./Workout";
import { ExerciseStatistic } from "./ExerciseStatistic";

@Entity('calendar_entries')
export class CalendarEntry {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.calendarEntries)
    user: User;

    @ManyToOne(()=> Workout, workout => workout.calendarEntries)
    workout: Workout;

    @OneToMany(() => ExerciseStatistic, exerciseStatistic => exerciseStatistic.calendarEntry)
    exerciseStatistic: ExerciseStatistic[];

    @Column({type:'timestamptz'})
    date: Date
}