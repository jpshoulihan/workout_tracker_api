import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn({type:'bigint'})
    id: number;

    @Column({nullable:true})
    firstName: string;

    @Column({nullable:true})
    lastName: string;

    @Column('int', {nullable:true})
    age: number;

    @Column('real', {nullable:true})
    weight: number;

    @Column('real', {nullable:true})
    height: number;

    @Column('text', {nullable:true})
    avatar: string;

    @Column({unique: true, nullable:true})
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({default: new Date()})
    createdAt: string;
}