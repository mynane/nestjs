
/**
 * @file page.middleware.ts
 * @author shijh
 *
 * 中间件
 */
import { HttpException } from '@nestjs/core';
import {
    Middleware, NestMiddleware
} from '@nestjs/common';
import CommonService from '../../common/common.service';

@Middleware()
export class PageMiddleware implements NestMiddleware {
    resolve() {
        return async (req, res, next) => {
            const { user = { _id: '' } } = req.session;
            if (!user._id) {
                throw new HttpException(CommonService.notFoundResponse(), 401);
            }
            next();
        }
    }
}