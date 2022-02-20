import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { DateTime } from "luxon";

@ValidatorConstraint({ name: 'isValidTimezone', async: true })
@Injectable()
export class ValidDateRule implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        try{
            const dateArray = value.split('-')
            const time = DateTime.fromObject({
                day: dateArray[0],
                month: dateArray[1],
                year: dateArray[2]
            })
            if (time.isValid) return true;
            return false;
        }catch(e){
            throw new HttpException('Unable to parse given date', HttpStatus.BAD_REQUEST)
        }
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        throw new HttpException('Validation error: invalid date', HttpStatus.BAD_REQUEST);
    }

}