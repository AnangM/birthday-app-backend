import { IsNotEmpty, IsString, Validate } from "class-validator";
import { ValidDateRule } from "../validator/date.validator";
import { ValidTimezoneRule } from "../validator/timezone.validator";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    first_name: string;
    
    @IsString()
    @IsNotEmpty()
    last_name: string;
    
    @IsString()
    @IsNotEmpty()
    @Validate(ValidDateRule)
    birth_date: string;

    @Validate(ValidTimezoneRule)
    @IsNotEmpty()
    location: string;
}