import {
    Controller, Get, Post,
    Request, Response, Body,
    HttpStatus, Param
} from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { ShareService } from './share.service';
import CommonService from '../../common/common.service';
import * as _ from 'lodash';

@Controller('share')
export class ShareController {
    constructor(private service: ShareService) {}

    @Get('/findOne/:id')
    async findOne(@Response() res, @Param('id') id) {
        let result = await this.service.findOne({_id: id}, 'page');
        result = result ? CommonService.commonResponse(
            _.assign({}, result.page._doc, {
                isShare: true,
                shareTime: result.shareTime
            })
        ) : [];
        res.status(HttpStatus.OK).json(result);
    }

    @Get('/user/:userId')
    async find(@Response() res, @Param('userId') userId) {
        let result = await this.service.find({user: userId}, 'page');
        res.status(HttpStatus.OK).json(CommonService.commonResponse(result));
    }

    @Get('/delete/:id')
    async delete(@Response() res, @Param('id') id) {
        await this.service.delete({
            _id: id
        })
        res.status(HttpStatus.OK).json(CommonService.commonResponse({}));
    }

    @Get('/lists')
    async lists(@Request() req, @Response() res) {
        const { query, session } = req;
        const { user } = session;
        let result = await this.service.query(query, { user: user._id });
        res.status(HttpStatus.OK).json(CommonService.commonResponse(result));
    }
    
    @Post('/add')
    async add(@Response() res, @Body() body) {
        const { userId, pageId } = body;
        let result = await this.service.add({
            page: pageId,
            user: userId
        })
        res.status(HttpStatus.OK).json(CommonService.commonResponse(result));
    }
}

