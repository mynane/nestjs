/**
 * @file fork.service.ts
 * @author shijh
 *
 * fork service 
 */

import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import ForkModel from './fork.model';

@Component() 
export class ForkService {
    async getFork(param, populate = '') {
        return await ForkModel.find(param, {'forkUser._id': 0})
            .populate(populate, {_id: 1, userDspName: 1, userName: 1})
            .exec((err, doc) => {
                if (err) {
                    throw new HttpException('系统错误', 500);
                }
                return doc;
            })
    }

    async add(data) {
        return await ForkModel.create(data, (err, doc) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }
            return doc;
        })
    }

    async update(param, data) {
        return await ForkModel.update(param, data, (err, doc) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }
            return doc;
        })
    }
}
