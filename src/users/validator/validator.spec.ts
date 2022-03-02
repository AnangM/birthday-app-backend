import { ValidDateRule } from "./date.validator"
import { ValidTimezoneRule } from "./timezone.validator"

describe('Validator',()=>{
    let dateValidator: ValidDateRule
    let timezoneValidator: ValidTimezoneRule

    beforeAll(()=>{
        dateValidator = new ValidDateRule()
        timezoneValidator = new ValidTimezoneRule()
    })

    function dateValidatorException(){
        dateValidator.defaultMessage()
    }

    function timezoneValidatiorException(){
        timezoneValidator.defaultMessage()
    }

    function invalidDate(){
        timezoneValidator.validate('02-10/2000')
    }


    describe('valid date',()=>{
        it('Should be valid',()=>{
            expect(dateValidator.validate('10-30-2000')).toBe(true)
        })

        it('Should be invalid',()=>{
            expect(dateValidator.validate('30-02-2000')).toBe(false)
        })
    })

    describe('valid timezone',()=>{
        it('Should be valid',()=>{
            expect(timezoneValidator.validate('Asia/Jakarta')).toBe(true)
        })

        it('Should be invalid',()=>{
            expect(timezoneValidator.validate('Asia/Semarang')).toBe(false)
        })
    })

    describe('error message',()=>{
        it('Should throw exception',()=>{
            expect(()=>{dateValidatorException()}).toThrow('Validation error: invalid date')
        })

        it('Should throw exception',()=>{
            expect(()=>{timezoneValidatiorException()}).toThrow('Validation error: invalid timezone')
        })
    })
})