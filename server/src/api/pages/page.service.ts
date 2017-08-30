import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import * as _ from 'lodash';
import * as LZString from 'lz-string';
import PageModel from './page.model';
import CommonService from '../../common/common.service';
import { ForkService, ShareService } from '../';
const forkService = new ForkService();
const shareService = new ShareService();

@Component()
export class PageService {
    /**
     * 获取某个页面
     * @param id {ObjectId} 页面id
     */
    async getPage(id, ig = {}) {
        const result = await PageModel.findById(id, ig, (err, doc) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }
            return doc;
        })
        return result;
    }

    /**
     * 删除页面id
     * @param id {ObjectId} 页面id
     */
    async removePage(id) {
        return await Promise.all([
            PageModel.remove({_id: id}, (err) => {
                if (err) {
                    throw new HttpException('系统错误', 500);
                }
                return {};
            }),
            shareService.delete({page: id})
        ]).then((param) => {
            return {}
        })
    }

    /**
     * 分级查询
     * @param param 分页查询（通过title模糊查询）
     */
    async pagingQuery(param, query) {
        const {
            page = 1, pageSize = 10, populate = '',
            title = '', sortParams = { createTime: -1 }
        } = param;

        const start = (page - 1) * pageSize;

        const result = await Promise.all([
            PageModel.count(query).exec((err, count) => {
                return count;
            }),
            PageModel
                .find(query, {content: 0, __v: 0})
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
        return {
            lists: result[1],
            total: result[0],
            pageSize,
            page
        };
    }

    /**
     * fork 页面
     * @param id pageId
     */
    async updateFork(userId, pageId, title) {
        const page = await PageModel.findById(pageId, (err, doc) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }
            return doc
        });

        const {
            _id, forkId, owerUser, forkTime,
            fork, createUser, createTime, content
        } = page;

       const pageDta = await this.addPage({
            owerUser: userId,
            parentId: pageId,
            forkNum: 0,
            fork: true,
            createUser,
            title,
            body: {
                content: content ? content : {},
            },
            createTime,
        })

        let result = {
            _id: forkId
        };

        if (forkId) {
            await forkService.update(
                { page: pageId },
                {
                    $addToSet: { forkUser: { userId, newPage: pageDta.data.id }
                },
            })
        } else {
            result = await forkService.add({
                page: pageId,
                forkUser: [{ userId, newPage: pageDta.data.id }]
            })
        }
        await PageModel.findByIdAndUpdate(pageId, {$inc: {forkNum: 1}, forkId: result._id});
        return pageDta;
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
     * 更新页面
     * @param id {ObjectId} 页面id
     * @param param {Object} 需要修改的值
     */
    async update(id, param) {
        const result = await PageModel.findByIdAndUpdate(id, param, (err, doc) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }
            return doc;
        })
        return result;
    }

    /**
     * 分享页面给指定用户
     * @param param {Onject} 分享参数
     */
    async share(param) {
        const { userId, pageId } = param;
        const result = await shareService.add({
            user: userId,
            page: pageId
        })
        return CommonService.commonResponse(result);
    }

    /**
     * 新增页面
     * @param {Object} page 页面信息
     */
    async addPage(page) {
        const { body, ...param } = page;
        const { content, ...props } = body;
        const parse = (content instanceof Object) ? LZString.compressToBase64(JSON.stringify(content)) : content;
        const result = await PageModel.create({
            ...param,
            ...props,
            content: parse
        }, (err, doc) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }
            return doc;
        })
        return  CommonService.commonResponse({id: result._id});
    }
}
