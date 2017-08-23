import {
    Controller, Get, Post,
    Request, Response, Body,
    HttpStatus, Param
} from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { PageService } from './page.service';

@Controller('page')
export class PageController {
    constructor(private pageService: PageService) {}

    @Get('/query/:id')
    async getPage(@Response() res, @Param('id') id) {
        const page = await this.pageService.getPage(id);
        res.status(HttpStatus.OK).json(page);
    }

    @Get('/remove/:id')
    async removePage(@Response() res, @Param('id') id) {
        const page = await this.pageService.removePage(id);
        res.status(HttpStatus.OK).json(page);
    }

    @Get('/query')
    async pagingQuery(@Request() req, @Response() res) {
        const { query } = req;
        const pages = await this.pageService.pagingQuery(query);
        res.status(HttpStatus.OK).json(pages);
    }

    @Post('/update')
    async updatePage(@Response() res, @Body() body) {
        const { id, page } = body;
        const result = await this.pageService.updatePage(id, page);
        res.status(HttpStatus.OK).json(result);
    }

    @Post()
    async addPage(@Response() res, @Body() body) {
        const result = await this.pageService.addPage(body);
        res.status(HttpStatus.OK).json(result);
    }
}
