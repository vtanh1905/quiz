import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ExampleRepository } from './example.repository';
import { Example, ExampleSchema } from './example.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Example.name, schema: ExampleSchema }])],
  providers: [ExampleRepository],
  exports: [ExampleRepository],
})
export class ExampleModel {}
