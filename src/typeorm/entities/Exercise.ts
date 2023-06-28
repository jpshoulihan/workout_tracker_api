import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type BodySplitType = 'upper' | 'lower'
export type ActionType = 'push' | 'pull'

//could become long, move to other file
export enum EquipmentType {
    BUMBBELL = 'dumbbell',
    BARBELL = 'barbell',
    BODYWEIGHT = 'bodyweight'
}

@Entity({name: 'exercises'})
export class Exercise {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'enum', enum: ['upper', 'lower'], default: 'upper'})
    bodySplit: BodySplitType

    @Column({type: 'enum', enum: ['push', 'pull'], default: 'push'})
    action: ActionType

    @Column({type: 'enum', enum: EquipmentType, default: EquipmentType.BARBELL})
    equipment: EquipmentType
    
    @Column()
    exerciseName: string;

    @Column()
    instruction: string;
}