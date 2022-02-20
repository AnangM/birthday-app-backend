import { DateTime, Duration } from "luxon"

export class DateCalculator {
    /**
     * Calculate user's next birth day to be set as job reservation at 9 o'clock localtime
     * 
     * @param date user's birth day in dd-mm-yyyy
     * @param timezone user's timezone in IANA format
     * @returns number (time in UTC in seconds since epoch)
     */
    public static CalculateUserNextBirthday(date: string, timezone: string): number {
        const dateArray: string[] = date.split('-')
        let birth_date = DateTime.utc(parseInt(dateArray[2]), parseInt(dateArray[1]), parseInt(dateArray[0]), 9).setZone(timezone)

        if (!birth_date.isValid) {
            throw new Error('Invalid birth date')
        }

        let current = DateTime.utc()
        let different = birth_date.plus({ year: (current.year - birth_date.year), minute: -birth_date.offset }).toSeconds() - current.toSeconds()

        // If positive means it is in future so return this year
        if (different > 0) {
            return birth_date.plus({ year: (current.year - birth_date.year), minute: -birth_date.offset }).toSeconds()
        }

        return birth_date.plus({ year: (current.year - birth_date.year + 1), minute: -birth_date.offset }).toSeconds()
    }
}