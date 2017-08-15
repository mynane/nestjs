import {
    Controller, Get, Post,
    Response, Param, Body,
    HttpStatus
} from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('api/users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getAllUsers(@Response() res) {
        this.usersService.getAllUsers()
            .then((users) => res.status(HttpStatus.OK).json(users))
    }

    @Get('/:id')
    getUser(@Response() res, @Param('id') id) {
        this.usersService.getUser(+id)
            .then((user) => res.status(HttpStatus.OK).json(user))
    }

    @Post()
    addUser(@Response() res, @Body('user') user) {
        this.usersService.addUser(res)
    }
}