import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { createTestDB } from "../../../src/utils/testing/connection.helper";
import { JobEntity } from "../../../src/notifications/job.entity";
import { UserEntity } from "../user.entity";
import { UsersController } from "../users.controller";
import { UsersService } from "../users.service";

describe('UserService', () => {
    let userController: UsersController
    let userService: UsersService
    let user: UserEntity
    beforeAll(async () => {

        const moduleRef = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forFeature([UserEntity, JobEntity]),
                TypeOrmModule.forRoot(createTestDB([UserEntity, JobEntity]))
            ],
            controllers: [UsersController],
            providers: [UsersService]
        }).compile()

        userService = moduleRef.get<UsersService>(UsersService)
        userController = moduleRef.get<UsersController>(UsersController)
    })

    describe('index', () => {
        it('Should return Users Service', () => {
            const result = 'Users service'
            expect(userController.index()).toBe(result)
        })
    })

    describe('createUser', () => {
        it('Should create new user', async () => {
            const newUser = await userService.createUser('Test', 'User', '10-03-2000', 'Asia/Jakarta')
            user = newUser
            expect(newUser.id).toBeDefined()
        })
    })

    describe('Get User By ID', () => {  
        it('Should return created user', async () => {
            const dbUser = await userService.getUserById(user.id)
            expect(dbUser.id).toBe(user.id)
        })

        it('Should throw an exception', async () => {
            const user = await userService.getUserById('111beac4-39c4-46c9-8576-a34481dcs2fc').then((r) => { return r }).catch((e) => { return e.message })
            expect(user).toBe('User not found')
        })
    })

    describe('Update User', () => {
        it('Should update user\'s name', async () => {
            const updatedUser = await userService.updateUser(user.id, 'updated', 'test', '10-03-2000', 'Asia/Jakarta')
            expect(updatedUser.first_name).toBe('updated')
        })
    })

    describe('Delete User', () => {
        it('Should delete user', async () => {
            const deletedUser = await userService.deleteUser(user.id).then((r)=>{return r})
            expect(deletedUser.id).toBeUndefined()
        })
    })


})