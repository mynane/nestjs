import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import Users from '../model/user.model';
import CommonService from '../../common/common.service'

@Component()
export class CheckService {
  async checkUser(name: string) {
    const result = await Users.find({userName: name}, {"__v": 0}, (err, doc) => {
       if (err) {
         throw new HttpException('系统错误', 500);
       }
        return doc
    })
    return CommonService.commonResponse(result)
  }
}