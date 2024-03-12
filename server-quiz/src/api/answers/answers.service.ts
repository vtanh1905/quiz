import { Injectable, NotFoundException } from '@nestjs/common';

import { AnswerRepository, QuestionRepository, Quiz, QuizRepository } from '../../model';

@Injectable()
export class AnswersService {
  constructor(
    private readonly answerRepository: AnswerRepository,
  ) {}

  async isCorrectAnswer(id: string) {
    /* Validate whether the quiz exists */
    const answer = await this.answerRepository.findOne({ _id: id });
    if (!answer) {
      throw new NotFoundException();
    }
    /* return data */
    return {
      isCorrect: answer.isCorrect,
    };
  }
}
