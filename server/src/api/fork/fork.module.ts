import {
    Module, MiddlewaresConsumer, RequestMethod,
    Shared
} from '@nestjs/common';
import { ForkController } from './fork.controller';
import { ForkService } from './fork.service';
import { AuthMiddleware } from '../../middleware/auth.middleware';

@Shared()
@Module({
    controllers: [
        ForkController
    ],
    components: [
        ForkService
    ]
})
export class ForkModule {
    configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(ForkController)
    }
}
