import { Body, Controller, Delete, Get, Header, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get()
    @ApiTags('user')
    @ApiOperation({summary:'Check user service status'})
    @ApiResponse({
        status:200,
        description: 'User service running properly',
    })
    index(): string {
        return 'Users service'
    }

    @Post()
    @ApiTags('user')
    @ApiOperation({summary:'Create new user'})
    @ApiResponse({
        status:201,
        description: 'User created',
        type:UserEntity
    })
    @Header('content-type', 'application/json')
    createUser(@Body() body:UserDto): any {
        return this.userService.createUser(body.first_name, body.last_name, body.birth_date, body.location);
    }

    @Put(':id')
    @Post()
    @ApiTags('user')
    @ApiOperation({summary:'Update existing user'})
    @ApiResponse({
        status:200,
        description: 'User updated successfully',
        type:UserEntity
    })
    @Header('content-type', 'application/json')
    updateUser(@Param('id') id: string, @Body() body: UserDto): any {
        return this.userService.updateUser(id, body.first_name, body.last_name, body.birth_date, body.location);
    }

    @Delete(':id')
    @ApiTags('user')
    @ApiOperation({summary:'Delete existing user'})
    @ApiResponse({
        status:200,
        description: 'User deleted successfully',
        type:UserDto
    })
    @Header('content-type', 'application/json')
    deleteUser(@Param('id') id: string): any {
        return this.userService.deleteUser(id)
    }
}
