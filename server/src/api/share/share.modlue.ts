import {
    Module, MiddlewaresConsumer, RequestMethod,
    Shared
} from '@nestjs/common';
import { ShareController } from './share.controller';
import { ShareService } from './share.service';
import { AuthMiddleware } from '../../middleware/auth.middleware';

@Shared()
@Module({
    controllers: [
        ShareController
    ],
    components: [
        ShareService
    ]
})
export class ShareModule {
    configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(ShareController)
    }
}
