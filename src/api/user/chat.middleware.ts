import { Middleware } from '@nestjs/common';
import { GatewayMiddleware } from '@nestjs/websockets';
import { UsersService } from './user.service';

@Middleware()
export class ChatMiddleware implements GatewayMiddleware {
    public resolve(): (socket, next) => void {
        return (socket, next) => {
            console.log('Authorization...');
            next();
        }
    }
}
