import { Body, Controller, Delete, Get, Header, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get()
    index(): string {
        return 'Users service'
    }

    @Post()
    @Header('content-type', 'application/json')
    createUser(@Body() body:CreateUserDto): any {
        return this.userService.createUser(body.first_name, body.last_name, body.birth_date, body.location);
    }

    @Put(':id')
    @Header('content-type', 'application/json')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto): any {
        return this.userService.updateUser(id, body.first_name, body.last_name, body.birth_date, body.location);
    }

    @Delete(':id')
    @Header('content-type', 'application/json')
    deleteUser(@Param('id') id: string): any {
        return this.userService.deleteUser(id)
    }
}
