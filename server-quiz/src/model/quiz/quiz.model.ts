import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { QuizRepository } from './quiz.repository';
import { Quiz, QuizSchema } from './quiz.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }])],
  providers: [QuizRepository],
  exports: [QuizRepository],
})
export class QuizModel {}
