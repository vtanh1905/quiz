import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { QuestionRepository } from './question.repository';
import { Question, QuestionSchema } from './question.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }])],
  providers: [QuestionRepository],
  exports: [QuestionRepository],
})
export class QuestionModel {}
