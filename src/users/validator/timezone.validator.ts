import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { DateTime } from "luxon";

@ValidatorConstraint({ name: 'isValidTimezone', async: true })
@Injectable()
export class ValidTimezoneRule implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        const time = DateTime.now().setZone(value)
        if (time.isValid) return true;
        return false;
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        throw new HttpException('Validation error: invalid timezone', HttpStatus.BAD_REQUEST);
    }

}