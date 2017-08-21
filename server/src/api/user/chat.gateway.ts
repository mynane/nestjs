import {
    WebSocketGateway, SubscribeMessage, WebSocketServer,
    OnGatewayInit, OnGatewayConnection
} from '@nestjs/websockets';
import { ChatMiddleware } from './chat.middleware';

@WebSocketGateway({
    port: 2000,
    namespace: 'hazer',
    middlewares: [ ChatMiddleware ]
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection {
    @WebSocketServer() private server;

    public afterInit(server) { }

    public handleConnection(client) {
        client.emit('init', {message: '链接完成'})
    }

    @SubscribeMessage('event')
    public onMessage(client, data) {
        client.emit('event:add', data);
    }
}