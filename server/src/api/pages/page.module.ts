import { Module, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { PageController } from './page.controller';
import { PageService } from './page.service';
import { ForkModule, ShareModule } from '../';
import { AuthMiddleware } from '../../middleware/auth.middleware';

@Module({
    controllers: [
        PageController
    ],
    components: [
        PageService
    ],
    modules: [
        ForkModule,
        ShareModule
    ]
})
export class PageModule {
    configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(PageController)
    }
}
