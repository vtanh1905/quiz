import { Module } from '@nestjs/common';

import { QuizzesModule } from './quizzes/quizzes.module';
import { MetaModule } from './meta/meta.module';

@Module({
  imports: [MetaModule, QuizzesModule],
})
export class ApiModule {}
