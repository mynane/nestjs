import {
    Controller, Get, Post,
    Response, Param, Body,
    HttpStatus, UseFilters, UsePipes
} from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { UsersService } from './user.service';
import { CheckService } from '../check/check.service';
import { ChatGateway } from './chat.gateway';
import { NotFoundExceptionFilter } from './user.filter';
import { CustomPipe } from './user.pipe';


@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) {
    }

    @Get()
    async getAllUsers(@Response() res) {
        const users = await this.usersService.getAllUsers();
        res.status(HttpStatus.OK).json(users);
    }

    @Get('/:id')
    @UseFilters(new NotFoundExceptionFilter())
    async getUser(@Response() res, @Param('id') id) {
        const user = await this.usersService.getUser(id)
        res.status(HttpStatus.OK).json(user);
    }

    @Post()
    @UsePipes(new CustomPipe())
    async addUser(@Response() res, @Body() body) {
        const { userName, password, ...params } = body;
        const user = await new CheckService().checkUser(userName);
        console
        if (user.data.length) {
            throw new HttpException({
                code: 500,
                message: '用户名已经存在',
                data: []
            }, 200);
        }
        const msg = await this.usersService.addUser(body)
        res.status(HttpStatus.OK).json(msg);
    }
}