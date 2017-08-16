import {
  Controller, Get, Post,
  Response, Param, Body,
  HttpStatus
} from '@nestjs/common';
import { CheckService } from './check.service';

@Controller('check')
export class CheckController {
  constructor(private checkService: CheckService) {}

  @Get('/user/:name')
  async checkUser(@Response() res, @Param('name') name) {
    const user = await this.checkService.checkUser(name)
    res.status(HttpStatus.OK).json(user);
  }
}