import { Module, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { CheckController } from './check.controller';
import { CheckService } from './check.service';

@Module({
  controllers: [ CheckController ],
  components: [ CheckService ],
})
export class CheckModule { }