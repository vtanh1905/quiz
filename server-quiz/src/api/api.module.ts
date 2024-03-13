import { Module } from '@nestjs/common';

import { QuizzesModule } from './quizzes/quizzes.module';
import { MetaModule } from './meta/meta.module';
import { AnswersModule } from './answers/answers.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MetaModule, QuizzesModule, AnswersModule, AuthModule],
})
export class ApiModule {}
