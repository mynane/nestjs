import {
    Controller, Get, Post,
    Response, Param, Body, Request,
    HttpStatus, UseFilters, UsePipes
} from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { UsersService } from './user.service';
import { ChatGateway } from './chat.gateway';
import { NotFoundExceptionFilter } from './user.filter';
import { CustomPipe } from './user.pipe';
import * as uuid from 'node-uuid';
import * as Config from '../../config/local.env';
import CommonService from '../../common/common.service';

@Controller('users')
export class UsersController {
    constructor(
        private service: UsersService
    ) { }

    @Get()
    async getAllUsers(@Response() res) {
        const users = await this.service.getAllUsers();
        res.status(HttpStatus.OK).json(CommonService.commonResponse(users));
    }

    @Get('/find')
    async getUser(@Request() req, @Response() res) {
        const { id } = req.query;
        const user = await this.service.getUser({_id: id})
        res.status(HttpStatus.OK).json(CommonService.commonResponse(user));
    }

    @Post('/login')
    async login(@Request() req, @Response() res, @Body() body) {
        const { user = {} } = req.session;
        const { password, userName } = body;
        const result = await this.service.login({
            password,
            userName
        });
        if (result) {
            var token = uuid.v1();
            // 设置token在session
            req.session.token = token;
            // 保存用户信息在session中
            req.session.user = result;
            // 设置cookie过期时间1天
            res.cookie(
                'sessionId',
                token,
                {
                    expires: new Date(Date.now() + Config.expiresIn),
                    httpOnly: true,
                    domain: 'localhost'
                }
            );
            res.status(HttpStatus.OK).json(CommonService.loginOk({id: result._id}));
        }
        res.status(HttpStatus.OK).json(CommonService.loginError({}));
    }

    @Get('/logout')
    async logout(@Request() req, @Response() res) {
        req.session.token = null;
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
        const user = await this.service.getUser({ userName });
        if (user) {
            throw new HttpException({
                code: 500,
                message: '用户名已经存在',
                data: []
            }, 200);
        }
        const msg = await this.service.addUser(body)
        res.status(HttpStatus.OK).json(CommonService.commonResponse(msg));
    }
}
