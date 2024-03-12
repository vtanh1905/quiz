import { Injectable, NotFoundException } from '@nestjs/common';

import { AnswerRepository, QuestionRepository, Quiz, QuizRepository } from '../../model';

@Injectable()
export class QuizzesService {
  constructor(
    private readonly quizRepository: QuizRepository,
    private readonly questionRepository: QuestionRepository,
    private readonly answerRepository: AnswerRepository,
  ) {}

  async getQuestionsById(id: string) {
    /* Validate whether the quiz exists */
    const quiz = await this.quizRepository.findOne({ _id: id });
    if (!quiz) {
      throw new NotFoundException();
    }
    /* Recognize the type of each question */
    const questionWithType = await this.questionRepository.getQuestionsWithTypeById(id);

    /* return data */
    return questionWithType;
  }
}
