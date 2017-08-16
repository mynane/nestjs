import { Module, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { UsersModule } from './api/user/user.module';
import { CheckModule } from './api/check/check.module';

@Module({
    modules: [ UsersModule, CheckModule ]
})
export class ApplicationModule { }
