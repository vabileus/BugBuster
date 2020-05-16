import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { User } from './entity/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<void> {
        return this.usersService.remove(id);
    }
}