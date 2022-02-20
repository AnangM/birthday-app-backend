import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'m_users'})
export class UserEntity{
     @ApiProperty({
        example: 'ecda46e2-78b4-4dce-9b25-76c193169625',
        description:`User's ID in uuid v4`
    })
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @ApiProperty({
        example: 'John',
        description:`User's first name`
    })
    @Column({type: "varchar", length: 250})
    first_name: string;
    

    @ApiProperty({
        example: 'Cena',
        description:`User's last name`
    })
    @Column({type: "varchar", length: 250})
    last_name: string;
    
    @ApiProperty({
        example: '01-10-2010',
        description:`User's birth date in dd-mm-yyyy`
    })
    @Column({type: "date"})
    birth_date: string;

    @ApiProperty({
        example: 'America/New_York',
        description:`User's timezone in IANA format`
    })
    @Column({type: "varchar", length: 250})
    location: string;
}