import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobEntity } from '../../src/notifications/job.entity';
import { DateCalculator } from '../../src/utils/date/calculator';
import { Connection, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @InjectRepository(JobEntity) private jobRepository: Repository<JobEntity>, private connection: Connection) { }

    async createUser(first_name: string, last_name: string, birth_date: string, location: string): Promise<UserEntity> {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect()
        await queryRunner.startTransaction()
        try {
            const newUser = await queryRunner.manager.save(this.userRepository.create({ first_name, last_name, birth_date, location }));
            let newJob = {
                user:newUser,
                message: `Hey, ${first_name} ${last_name} it’s your birthday`,
            }
            const reserved_at: number = DateCalculator.CalculateUserNextBirthday(birth_date, location)
            const attempt = 0;
            const job: string = JSON.stringify(newJob)
            await queryRunner.manager.save(this.jobRepository.create({ job: job, attempt: attempt, reserved_at: reserved_at }))
            await queryRunner.commitTransaction()
            return newUser;
        } catch (e) {
            await queryRunner.rollbackTransaction()
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        } finally {
            await queryRunner.release()
        }
    }

    async getUserById(id: string): Promise<UserEntity> {
        try {
            return await this.userRepository.findOneOrFail(id);
        } catch (e) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }

    async deleteUser(id: string): Promise<UserEntity> {
        const user = await this.getUserById(id);
        const stm = this.jobRepository.createQueryBuilder('jobs').where(`job like '%${id}%'`).delete()
        stm.execute()
        return this.userRepository.remove(user);
    }

    async updateUser(id: string, first_name: string, last_name: string, birth_date: string, location: string): Promise<UserEntity> {
        const user = await this.getUserById(id);
        user.first_name = first_name;
        user.last_name = last_name;
        user.birth_date = birth_date;
        user.location = location;

        return this.userRepository.save(user);
    }




}
