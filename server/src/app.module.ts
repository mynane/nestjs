import { Module, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { UsersModule } from './api/user/user.module';
import { CheckModule } from './api/check/check.module';
import { PageModule } from './api/pages/page.module';

@Module({
    modules: [
        UsersModule,
        CheckModule,
        PageModule
    ]
})
export class ApplicationModule { }
