import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { DateTime } from "luxon";

@ValidatorConstraint({ name: 'isValidTimezone', async: true })
@Injectable()
export class ValidDateRule implements ValidatorConstraintInterface {
    /**
     * Validate date to match mm-dd-yyyy rule
     * 
     * @param value value to be validated
     * @param validationArguments validation additional arguments
     * @returns boolean | HttpException
     */
    validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        try{
            const dateArray = value.split('-')
            const time = DateTime.fromObject({
                day: dateArray[1],
                month: dateArray[0],
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