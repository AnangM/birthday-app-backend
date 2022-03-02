import { DateCalculator } from "./calculator"

describe('DateCalculator',()=>{
    function invalidDate(){
        DateCalculator.CalculateUserNextBirthday('02-30-2000','Asia/Jakarta')
    }

    function invalidTimezone(){
        DateCalculator.CalculateUserNextBirthday('10-30-2000','Asia/Semarang')
    }

    describe('Work',()=>{
        it('Should return this year',()=>{
            expect(DateCalculator.CalculateUserNextBirthday('10-30-2000','Asia/Jakarta')).toBeDefined()
        })

        it('Should return next year',()=>{
            expect(DateCalculator.CalculateUserNextBirthday('01-01-2000','Asia/Jakarta'))
        })

        it('Should not be working',()=>{
            expect(invalidDate).toThrowError('Invalid birth date')
        })

        it('Should not be working',()=>{
            expect(invalidTimezone).toThrowError('Invalid birth date')
        })
    })
})