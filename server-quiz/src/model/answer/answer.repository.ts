import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Answer } from './answer.schema';
import { BaseRepository } from '../base/base.repository';

@Injectable()
export class AnswerRepository extends BaseRepository<Answer> {
  constructor(@InjectModel(Answer.name) private readonly answerModel: Model<Answer>) {
    super(answerModel);
  }
}
