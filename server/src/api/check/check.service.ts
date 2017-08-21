import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { UsersModel } from '../../model';
import CommonService from '../../common/common.service'

@Component()
export class CheckService {
    async checkUser(name: string) {
        const result = await UsersModel.find({ userName: name }, { "__v": 0 }, (err, doc) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }
            return doc
        })
        return CommonService.commonResponse(result)
    }
    async check(param: Object) {
        const result = await UsersModel.find({...param}, {"__v": 0, "password": 0}, (err, doc) => {
            if (err) {
                throw new HttpException('系统错误', 500);
            }
            return doc
        })
        return CommonService.commonResponse(result)
    }
}