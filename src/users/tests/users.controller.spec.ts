import { JobEntity } from "../../notifications/job.entity"
import { Connection, Repository } from "typeorm"
import { UserEntity } from "../user.entity"
import { UsersController } from "../users.controller"
import { UsersService } from "../users.service"

describe('UserController',()=>{
    let userController : UsersController
    let userService: UsersService
    let userRepository: Repository<UserEntity>
    let jobRepository: Repository<JobEntity>
    let db:Connection
    
    beforeAll(()=>{
        userService = new UsersService(userRepository,jobRepository, db)
        userController  = new UsersController(userService)
    })

    describe('index',()=>{
        it('Should return User service',async ()=>{
            expect(userController.index).toBeDefined()
        })
    })
})