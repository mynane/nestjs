import { Module, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { AuthMiddleware } from './user.middleware';

@Module({
    controllers: [ UsersController ],
    components: [ UsersService ]
})
export class UsersModule {
    configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(UsersController)
            // .forRoutes({
            //     path: 'api/*',
            //     method: RequestMethod.ALL
            // })
    }
}
