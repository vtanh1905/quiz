import { Module } from '@nestjs/common';

import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { AnswerModel, QuestionModel, QuizModel } from '../../model';

@Module({
  imports: [QuizModel, QuestionModel, AnswerModel],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}
