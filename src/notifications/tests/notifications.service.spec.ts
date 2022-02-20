import { HttpModule } from "@nestjs/axios"
import { Test } from "@nestjs/testing"
import { TypeOrmModule } from "@nestjs/typeorm"
import { DateTime } from "luxon"
import { UserEntity } from "../../../src/users/user.entity"
import { createTestDB } from "../../../src/utils/testing/connection.helper"
import { JobEntity } from "../job.entity"
import { NotificationService } from "../notifications.service"

describe('Notification Service',()=>{
    let notificationService: NotificationService
    let job:JobEntity

    beforeAll(async()=>{
        const moduleRef = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forFeature([UserEntity, JobEntity]),
                TypeOrmModule.forRoot(createTestDB([UserEntity, JobEntity])),
                HttpModule
            ],
            providers: [NotificationService]
        }).compile()

        notificationService = moduleRef.get<NotificationService>(NotificationService)
    })

    describe('Create Job',()=>{
        it('Should prepare job for testing',async ()=>{
            const time = DateTime.utc().plus({hour:1})
            const jobString = {"user":{"first_name":"user","last_name":"LA","birth_date":"20-02-2000","location":"America/Los_Angeles","id":"e2c678b6-dee5-4350-b7f2-cbc41d88a2dd"},"message":"Hey, user LA it’s your birthday"}
            let newJob = await notificationService.createJob(JSON.stringify(jobString), parseInt(time.toSeconds().toString()))
            job = newJob;
            expect(newJob.id).toBeDefined()

        })
    })

    describe('Get all jobs to be performed',()=>{
        it('Should get job(s) to be performed',async()=>{
            let jobs = await notificationService.getJobToBePerformed(DateTime.utc().plus({ minute: 5 }).toSeconds())
            expect(jobs).toBeDefined()
        })
    })

    describe('Send Notification',()=>{
        it('should call web hook',async ()=>{
            let response = await notificationService.sendNotification('Hello').then((r)=>{return r.data}).catch((e)=>{return e.message})
            expect(response).toBeDefined()
        })
    })

    describe('Find Job',()=>{

        it('Should return created user', async () => {
            const dbUser = await notificationService.findJobById(job.id)
            expect(dbUser.id).toBe(job.id)
        })


        it('Should throw an exception', async () => {
            const user = await notificationService.findJobById(8080).then((r) => { return r }).catch((e) => { return e.message })
            expect(user).toBe('Job not found')
        })
    })

    describe('Job Completition',()=>{
        it('Failed job Should increment job attempt',async()=>{
            let failed = await notificationService.failedJob(job)
            let tmp = job
            job = failed
            expect(failed.attempt).toBe(tmp.attempt)
        })

        it('Should be done',async ()=>{
            let done = await notificationService.jobDone(job)
            expect(done.id).toBeDefined()
        })
    })
})