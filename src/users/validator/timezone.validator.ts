import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { DateTime } from "luxon";

@ValidatorConstraint({ name: 'isValidTimezone', async: true })
@Injectable()
export class ValidTimezoneRule implements ValidatorConstraintInterface {
    /**
     * Validate user's timezone string to match IANA format
     * 
     * @param value value to be validated
     * @param validationArguments additional validation arguments
     * @returns boolean | HttpException
     */
    validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        const time = DateTime.now().setZone(value)
        if (time.isValid) return true;
        return false;
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        throw new HttpException('Validation error: invalid timezone', HttpStatus.BAD_REQUEST);
    }

}