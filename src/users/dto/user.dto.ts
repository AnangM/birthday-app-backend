import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Validate } from "class-validator";
import { ValidDateRule } from "../validator/date.validator";
import { ValidTimezoneRule } from "../validator/timezone.validator";

export class UserDto{
    @IsString()
    @ApiProperty({
        example: 'John',
        description:`User's first name`
    })
    @IsNotEmpty()
    first_name: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Cena',
        description:`User's last name`
    })
    last_name: string;
    
    @IsString()
    @IsNotEmpty()
    @Validate(ValidDateRule)
    @ApiProperty({
        example: '01-10-2010',
        description:`User's birth date in dd-mm-yyyy`
    })
    birth_date: string;

    @Validate(ValidTimezoneRule)
    @IsNotEmpty()
    @ApiProperty({
        example: 'America/New_York',
        description:`User's timezone in IANA format`
    })
    location: string;
}