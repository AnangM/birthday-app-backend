import { DateTime, Duration } from "luxon"

export class DateCalculator{
    public static CalculateUserNextBirthday(date: string, timezone: string): number{
        const dateArray: string[] = date.split('-')
        let birth_date = DateTime.utc(parseInt(dateArray[2]), parseInt(dateArray[1]), parseInt(dateArray[0]), 9).setZone(timezone)

        if (!birth_date.isValid) {
            throw new Error('Invalid birth date')
        }

        let current = DateTime.utc()
        if (Duration.fromObject(current.diff(birth_date).toObject()).as('days') > 0) {
            return birth_date.plus({ year: (current.year - birth_date.year), minute: -birth_date.offset }).toSeconds()
        }

        return birth_date.plus({ year: (current.year - birth_date.year + 1), minute: -birth_date.offset }).toSeconds()
    }
}