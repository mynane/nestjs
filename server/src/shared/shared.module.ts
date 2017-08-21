import { Module, Shared } from '@nestjs/common';
import { ChatGateway } from '../api/user/chat.gateway';

@Shared()
@Module({
    components: [ ChatGateway ],
    exports: [ ChatGateway ]
})
export class ShareModule {}
