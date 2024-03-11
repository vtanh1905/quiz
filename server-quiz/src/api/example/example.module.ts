import { Module } from '@nestjs/common';

import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';
import { ExampleModel } from '../../model';

@Module({
  imports: [ExampleModel],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}
