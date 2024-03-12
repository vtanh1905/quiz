import { Module } from '@nestjs/common';

import { QuizzesModule } from './quizzes/quizzes.module';
import { MetaModule } from './meta/meta.module';
import { AnswersModule } from './answers/answers.module';

@Module({
  imports: [MetaModule, QuizzesModule, AnswersModule],
})
export class ApiModule {}
