import {
    Controller, Get, Post,
    Response, Param, Body, Request,
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
    ) { }

    @Get()
    async getAllUsers(@Response() res) {
        const users = await this.usersService.getAllUsers();
        res.status(HttpStatus.OK).json(users);
    }

    @Get('/find/:id')
    @UseFilters(new NotFoundExceptionFilter())
    async getUser(@Response() res, @Param('id') id) {
        const user = await this.usersService.getUser(id)
        res.status(HttpStatus.OK).json(user);
    }

    @Get('/login/:userName/:password')
    async login(@Request() req, @Response() res, @Param() param) {
        const { user = {} } = req.session;
        const { password } = param;
        const result = await this.usersService.login(param);
        if (result.password === password) {
            req.session.user = result;
            res.status(HttpStatus.OK).json({
                message: '登录成功',
                code: 200,
                data: {}
            });
        }
        res.status(HttpStatus.OK).json({
            message: '登录失败',
            code: 500,
            data: {}
        });
    }

    @Get('/logout')
    async logout(@Request() req, @Response() res) {
        req.session.user = {};
        res.status(HttpStatus.OK).json({
            message: '退出成功',
            code: 200,
            data: {}
        });
    }

    @Post()
    @UsePipes(new CustomPipe())
    async addUser(@Response() res, @Body() body) {
        const { userName, password, ...params } = body;
        const user = await new CheckService().checkUser(userName);
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