import { Module } from '@nestjs/common';

import { ExampleModule } from './example/example.module';
import { MetaModule } from './meta/meta.module';

@Module({
  imports: [MetaModule, ExampleModule],
})
export class ApiModule {}
