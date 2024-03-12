import { Module } from '@nestjs/common';

import { AnswersController } from './answers.controller';
import { AnswersService as AnswersService } from './answers.service';
import { AnswerModel } from '../../model';

@Module({
  imports: [AnswerModel],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
