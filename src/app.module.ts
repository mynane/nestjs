import { Module, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { UsersModule } from './api/user/user.module';

@Module({
    modules: [ UsersModule ]
})
export class ApplicationModule { }
