import { Component } from "@nestjs/common";
import { HttpException } from '@nestjs/core';
import * as _ from 'lodash';
import Users from './user.model';
import CommonService from '../../common/common.service'

@Component()
export class UsersService {
    /**
     * 查询全部用户
     */
    async getAllUsers() {
        const result = await Users.find({}, {"__v": 0}, (err, doc) => {
            if (err) {
                throw new HttpException('User not found', 404);
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
                throw new HttpException('User not found', 404);
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
                throw new HttpException('User not found', 404);
            }
            return doc;
        })
        return CommonService.commonResponse(result);
    }

    /**
     * 校验用户名是否重复
     * @param {string} name 用户名
     */
    async checkUser(name) {
        const result = await Users.find({name}, {"__v": 0}, (err, doc) => {
            if(err) {
                throw new HttpException('User not found', 404);
            }
            return doc;
        })
        return CommonService.commonResponse(result);
    }
}
