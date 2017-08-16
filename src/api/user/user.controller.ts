import {
    Controller, Get, Post,
    Response, Param, Body,
    HttpStatus
} from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async getAllUsers(@Response() res) {
        const users = await this.usersService.getAllUsers();
        res.status(HttpStatus.OK).json(users);
    }

    @Get('/:id')
    async getUser(@Response() res, @Param('id') id) {
        const user = await this.usersService.getUser(id)
        res.status(HttpStatus.OK).json(user);
    }

    @Post()
    async addUser(@Response() res, @Body('user') user) {
        const msg = await this.usersService.addUser(user)
        res.status(HttpStatus.OK).json(msg);
    }

    @Get('/checkUser/:name')
    async checkUser(@Response() res, @Body('name') name) {
        const user = await this.usersService.checkUser(name)
        res.status(HttpStatus.OK).json(user)
    }
}