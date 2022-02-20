import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('jobs')
export class JobEntity{
    @PrimaryGeneratedColumn('increment')
    readonly id: number

    @Column('text')
    job: string

    @Column('bigint')
    reserved_at: BigInt

    @Column('int')
    attempt: number

    @Column('int',{default:5})
    max_attempt:number
}
