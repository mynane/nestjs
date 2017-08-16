import { Component } from "@nestjs/common";
import { HttpException } from '@nestjs/core';
import * as _ from 'lodash';
import Users from '../model/user.model';
import CommonService from '../../common/common.service'

@Component()
export class UsersService {
    /**
     * 查询全部用户
     */
    async getAllUsers() {
        const result = await Users.find({}, {"__v": 0}, (err, doc) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }
            return doc;
        })
        return CommonService.commonResponse(result);
    }

    /**
     * 查询指定id
     * @param {string} id 用户id 
     */
    async getUser(id: string) {
        const result = await Users.findById(id, {"__v": 0}, (err, doc) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }
            return doc;
        })
        return CommonService.commonResponse(result);
    }

    /**
     * 新增用户
     * @param {Object} user 新增用户信息 
     */
    async addUser(user) {
        const result = await Users.create(user, (err, doc) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }
            return doc;
        })
        return CommonService.commonResponse(result);
    }
}
