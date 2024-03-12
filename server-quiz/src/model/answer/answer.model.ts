import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AnswerRepository } from './answer.repository';
import { Answer, AnswerSchema } from './answer.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Answer.name, schema: AnswerSchema }])],
  providers: [AnswerRepository],
  exports: [AnswerRepository],
})
export class AnswerModel {}
