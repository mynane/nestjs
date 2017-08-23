import { Module, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { PageController } from './page.controller';
import { PageService } from './page.service';

@Module({
    controllers: [
        PageController
    ],
    components: [
        PageService
    ]
})
export class PageModule {}
