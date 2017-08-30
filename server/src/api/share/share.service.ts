/**
 * @file fork.service.ts
 * @author shijh
 *
 * share service 
 */

import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import ShareModel from './share.model';

@Component() 
export class ShareService {
    async findOne(param, populate = '') {
        return await ShareModel.findOne(param)
            .populate(populate)
            .exec((err, doc) => {
                if (err) {
                    throw new HttpException('系统错误', 500);
                }
                return doc;
            })
    }

    async find(param, populate = '') {
        return await ShareModel.find(param)
        .populate(populate, {content: 0})
        .exec((err, doc) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }
            return doc;
        })
    }

    async add(data) {
        const share = await this.findOne(data);
        if (share) {
            return share;
        }
        return await ShareModel.create(data, (err, doc) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }
            return doc;
        })
    }

    async delete(param) {
        return await ShareModel.remove(param, (err, doc) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }
            return doc;
        })
    }

    async query(param, query) {
        const {
            page = 1, pageSize = 10, populate = '',
            title = ''
        } = param;

        const start = (page - 1) * pageSize;

        const result = await Promise.all([
            ShareModel.count(query).exec((err, count) => {
                return count;
            }),
            ShareModel
                .find(query, {user: 0})
                .skip(start)
                .limit(pageSize * 1)
                .populate('page', {content: 0})
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
}
