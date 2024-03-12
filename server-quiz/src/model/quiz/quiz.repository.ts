import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Quiz } from './quiz.schema';
import { BaseRepository } from '../base/base.repository';

@Injectable()
export class QuizRepository extends BaseRepository<Quiz> {
  constructor(@InjectModel(Quiz.name) private readonly quizeModel: Model<Quiz>) {
    super(quizeModel);
  }
}
