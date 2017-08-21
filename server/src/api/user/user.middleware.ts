import { HttpException } from '@nestjs/core';
import {
    Middleware, NestMiddleware
} from '@nestjs/common';
import { UsersService } from './user.service';
import CommonService from '../../common/common.service';

@Middleware()
export class AuthMiddleware implements NestMiddleware {
    constructor(private usersService: UsersService) {}

    resolve() {
        return async (req, res, next) => {
            const user = await this.usersService.getUser('5993b2f92707db75213488de');
            if (!user) {
                throw new HttpException(CommonService.notFoundResponse(), 401);
            }
            next();
        }
    }
}
