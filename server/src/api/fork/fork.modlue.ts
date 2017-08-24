import {
    Module, MiddlewaresConsumer, RequestMethod,
    Shared
} from '@nestjs/common';
import { ForkController } from './fork.controller';
import { ForkService } from './fork.service';

@Shared()
@Module({
    controllers: [
        ForkController
    ],
    components: [
        ForkService
    ]
})
export class ForkModule {}
