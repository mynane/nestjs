import {
    Module, MiddlewaresConsumer, RequestMethod,
    Shared
} from '@nestjs/common';
import { CheckController } from './check.controller';
import { CheckService } from './check.service';

@Shared()
@Module({
  controllers: [ CheckController ],
  components: [ CheckService ],
})
export class CheckModule { }