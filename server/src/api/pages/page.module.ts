import { Module, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { PageController } from './page.controller';
import { PageService } from './page.service';
import { ForkModule } from '../';
import { PageMiddleware } from './page.middleware';

@Module({
    controllers: [
        PageController
    ],
    components: [
        PageService
    ],
    modules: [
        ForkModule
    ]
})
export class PageModule {
    configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(PageMiddleware)
            .forRoutes(PageController)
    }
}
