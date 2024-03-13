import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Question } from './question.schema';
import { BaseRepository } from '../base/base.repository';
import { TypeQuestion } from 'src/common';

@Injectable()
export class QuestionRepository extends BaseRepository<Question> {
  constructor(@InjectModel(Question.name) private readonly questionModel: Model<Question>) {
    super(questionModel);
  }

  getQuestionsWithTypeById(quizId: string) {
    return this.questionModel.aggregate([
      {
        $match: {
          "quizId": quizId,
        }
      },
      { 
        $addFields: { 
          questionId: { "$toString": "$_id" },
        },
      },
      {
        $lookup: {
          from: "answers",
          localField: 'questionId',
          foreignField: 'questionId',
          as: 'answers'
        },
      },
      {
        $lookup: {
          from: "answers",
          localField: 'questionId',
          foreignField: 'questionId',
          pipeline: [{
            $match: {
              "isCorrect": true
            }
          }],
          as: 'correctAnswers'
        },
      },
      {
        $addFields: {
          amountCorrectAnswer: { $size: '$correctAnswers' },
       },
      },
      {
        $project: {
          hint: 1,
          body: 1,
          amountCorrectAnswer: 1,
          answers: {
            _id: 1,
            questionId: 1,
            body: 1,
          },
        }
      }
    ])
  }
}
