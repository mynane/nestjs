import {
    Controller, Get, Post,
    Request, Response, Param,
    Body, HttpStatus
} from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { CheckService } from './check.service';

@Controller('check')
export class CheckController {
    constructor(private checkService: CheckService) { }

    @Get('/user/:name')
    async checkUser( @Response() res, @Param('name') name) {
        const user = await this.checkService.checkUser(name)
        res.status(HttpStatus.OK).json(user);
    }

    @Get('/user')
    async checkUserName( @Request() req, @Response() res) {
        const { password, ...props } = req.query;
        if (Object.keys(props).length === 0) {
            throw new HttpException({
                code: 1000,
                message: '缺少查询参数',
                data: []
            }, 200)
        }
        const user = await this.checkService.check(props)
        res.status(HttpStatus.OK).json(user);
    }
}