import { Module, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { UsersModule } from './api/user/user.module';
import { PageModule } from './api/pages/page.module';
import { ForkModule } from './api/fork/fork.module';

@Module({
    modules: [
        UsersModule,
        PageModule,
        ForkModule
    ]
})
export class ApplicationModule { }
