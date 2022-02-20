import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { lastValueFrom } from "rxjs";
import { AxiosRequestConfig } from "axios";
import { DateTime } from "luxon";
import { JobEntity } from "./job.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DateCalculator } from "../../src/utils/date/calculator";

@Injectable()
export class NotificationService {
    private readonly logger = new Logger(NotificationService.name)

    constructor(private httpService: HttpService, @InjectRepository(JobEntity) private jobRepository: Repository<JobEntity>) { }

    @Cron(CronExpression.EVERY_30_MINUTES)
    async handleCron() {
        const jobs = await this.getJobToBePerformed(DateTime.utc().plus({ minute: 5 }).toSeconds())
        if (jobs.length != 0) {
            jobs.forEach(async (val, index) => {
                const payload = JSON.parse(val.job)
                await this.sendNotification(payload.message).then((resp) => { this.jobDone(val) }).catch((e) => { console.log(e.message);this.failedJob(val) })
            })
        }
        this.logger.debug(jobs.length)

    }

     async sendNotification(message: string): Promise<any> {
        try {
            const url = 'https://hookb.in/DrzwWJPoYPhPajxx1yqV'
            const data = {
                message: message
            }
            const requestConfig: AxiosRequestConfig = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            return lastValueFrom(this.httpService.post(url, data, requestConfig));
        } catch (e) {
            this.logger.error(e.message)
        }
    }

     async getJobToBePerformed(timestamp: number): Promise<JobEntity[]> {
        return this.jobRepository.createQueryBuilder("jobs").where(`reserved_at <= ${timestamp}`).getMany()
    }


    async findJobById(id: number): Promise<JobEntity> {
        try {
            return await this.jobRepository.findOneOrFail(id);
        } catch (e) {
            throw new HttpException('Job not found', HttpStatus.NOT_FOUND);
        }
    }

     async jobDone(job: JobEntity): Promise<JobEntity> {
        await this.jobRepository.remove(job)
        return this.createNextYearJob(JSON.parse(job.job))
    }

     async createNextYearJob(job: any):Promise<JobEntity> {
        let newJob = {
            user: job.user,
            message: job.message,
        }

        const reserved_at = DateCalculator.CalculateUserNextBirthday(job.user.birth_date, job.user.location)
        const attempt = 0

        return this.jobRepository.save(this.jobRepository.create({ job: JSON.stringify(newJob), attempt: attempt, reserved_at: reserved_at }))
    }

     async failedJob(job: JobEntity): Promise<JobEntity>{
        if(job.attempt >= job.max_attempt){
            await this.jobDone(job)
        }else{
            job.attempt = job.attempt+1
            return this.jobRepository.save(job)
        }
    }

    async createJob(job:string, reserved_at: number):Promise<JobEntity>{
        return this.jobRepository.save(this.jobRepository.create({job:job, attempt:0,reserved_at:reserved_at}))
    }
}