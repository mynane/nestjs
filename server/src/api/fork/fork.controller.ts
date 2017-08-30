import {
    Controller, Get, Post,
    Request, Response, Body,
    HttpStatus, Param
} from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { ForkService } from './fork.service';
import CommonService from '../../common/common.service';

@Controller('fork')
export class ForkController {
    constructor(private forkService: ForkService) {}

    @Get()
    async getFork(@Request() req, @Response() res) {
        const result = await this.forkService.getFork(req.query, 'forkUser.userId');
        res.status(HttpStatus.OK).json(CommonService.commonResponse(result));
    }
    
    @Post('/add')
    async add(@Response() res, @Body() body) {
        const { pageId, userId = '599430c0ab29321dacded426' } = body;
        const result = await this.forkService.add({
            page: pageId,
            forkUser: [{ userId }]
        })
        res.status(HttpStatus.OK).json(CommonService.commonResponse(result));
    }

    @Post('/update')
    async update(@Response() res, @Body() body) {
        const { pageId, userId = '599430c0ab29321dacded426' } = body;
        const result = await this.forkService.update({
            page: pageId
        }, {
            $addToSet: { forkUser: { userId } }
        })
        res.status(HttpStatus.OK).json(CommonService.commonResponse(result));
    }
}
