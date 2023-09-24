import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Exercise } from "./Exercise";
import { CalendarEntry } from "./CalendarEntry";

@Entity('exrercise_statistics')
export class ExerciseStatistic {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    sets: number;

    @Column()
    weight: number;

    @Column()
    reps: number;

    @Column()
    distance: number;

    @Column({type:'interval'})
    duration: string;

    @ManyToOne(()=> Exercise, exercise => exercise.exerciseStatistics)
    exercise: Exercise

    @ManyToOne(()=> CalendarEntry, calendarEntry => calendarEntry.exerciseStatistic)
    calendarEntry: CalendarEntry
}