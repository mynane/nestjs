import {
    Controller, Get, Post,
    Response, Param, Body,
    HttpStatus, UseFilters, UsePipes
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CheckService } from '../check/check.service';
import { ChatGateway } from './chat.gateway';
import { NotFoundExceptionFilter } from './user.filter';
import { CustomPipe } from './user.pipe';


@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        // private checkService: CheckService
    ) {}

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
    // @UsePipes(new CustomPipe())

    @Post()
    @UsePipes(new CustomPipe())
    async addUser(@Response() res, @Body('user') user) {
        // const name = await this.checkService.checkUser(user.userName);
        // console.log(name);
        const msg = await this.usersService.addUser(user)
        res.status(HttpStatus.OK).json(msg);
    }
}