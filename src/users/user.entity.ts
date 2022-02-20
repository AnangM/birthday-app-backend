import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'m_users'})
export class UserEntity{
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column({type: "varchar", length: 250})
    first_name: string;
    
    @Column({type: "varchar", length: 250})
    last_name: string;
    
    @Column({type: "date"})
    birth_date: string;

    @Column({type: "varchar", length: 250})
    location: string;
}