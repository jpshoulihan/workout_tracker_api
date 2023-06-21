import { ISession } from "connect-typeorm";
import { PrimaryColumn, Index, Column, Entity, DeleteDateColumn } from "typeorm";

@Entity({ name: 'sessions' })
export class SessionEntity implements ISession {
    @Index()
    @Column('bigint')
    public expiredAt = Date.now()

    @PrimaryColumn('varchar', { length: 255 })
    id = '';

    @Column('text')
    json : string;

    @DeleteDateColumn({ nullable: true })
    destroyedAt?: Date;
}