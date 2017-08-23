import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import * as _ from 'lodash';
import * as LZString from 'lz-string';
import PageModel from './page.model';
import CommonService from '../../common/common.service';
import Utils from '../../common/utils';

@Component()
export class PageService {
    /**
     * 获取某个页面
     * @param id {ObjectId} 页面id
     */
    async getPage(id) {
        const result = await PageModel.findById(id, {__v: 0}, (err, doc) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }
            return doc;
        })
        return CommonService.commonResponse(Utils.parseContent(result));
    }

    /**
     * 删除页面id
     * @param id {ObjectId} 页面id
     */
    async removePage(id) {
        const result = await PageModel.remove({_id: id}, (err) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }
            return 'ok';
        })
        return CommonService.commonResponse(result);
    }

    /**
     * 分级查询
     * @param param 分页查询（通过title模糊查询）
     */
    async pagingQuery(param) {
        const {
            page = 1, pageSize = 10, populate = '',
            title = '', sortParams = { createTime: -1 }
        } = param;

        const start = (page - 1) * pageSize;

        const result = await Promise.all([
            PageModel.count({"title": {$regex: title, $options:'i'}}).exec((err, count) => {
                return count;
            }),
            PageModel
                .find({"title": {$regex: title, $options:'i'}}, {content: 0, __v: 0})
                .skip(start)
                .limit(pageSize * 1)
                .populate('forkId', {password: 0})
                .populate('createUser', {password: 0})
                .populate('owerUser', {password: 0})
                .sort(sortParams)
                .exec((err, doc) => {
                    return doc;
                }
            )
        ])
        return CommonService.commonResponse({
            lists: result[1],
            total: result[0],
            pageSize,
            page
        });
    }

    /**
     * 通过id跟新页面
     * @param id {ObectId} 页面id
     * @param page {Object} 页面数据
     */
    async updatePage(id, page) {
        const { content } = page;
        const result = await PageModel.findByIdAndUpdate(id, { $set: { content: LZString.compressToBase64(JSON.stringify(content)) }}, (err, doc) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }
            return doc;
        })
        return CommonService.commonResponse(result);
    }

    /**
     * 新增页面
     * @param {Object} page 页面信息
     */
    async addPage(page) {
        const { content, ...param } = page;
        console.log(param)
        const result = await PageModel.create({
            content: LZString.compressToBase64(JSON.stringify(content)),
            ...param
        }, (err, doc) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }
            return doc;
        })
        return  CommonService.commonResponse({id: result._id});
    }
}
