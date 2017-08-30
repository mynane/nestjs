
/**
 * @file page.middleware.ts
 * @author shijh
 *
 * 认证middleware
 */
import { HttpException } from '@nestjs/core';
import {
    Middleware, NestMiddleware
} from '@nestjs/common';
import CommonService from '../common/common.service';

@Middleware()
export class AuthMiddleware implements NestMiddleware {
    resolve() {
        return async (req, res, next) => {
            const { sessionId } = req.cookies || req.headers;
            const { token } = req.session;
            if (process.env.NODE_ENV !== 'development') {
                if (!sessionId || !token || sessionId !== token ) {
                    throw new HttpException(CommonService.notFoundResponse(), 401);
                }
            }
            next();
        }
    }
}