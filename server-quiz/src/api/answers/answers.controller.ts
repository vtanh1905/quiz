import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { AnswersService } from './answers.service';
import { ObjectIdPipe } from 'src/common/pipes';

@ApiTags('answers')
@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post(':id')
  async isCorrectAnswer(@Param('id', ObjectIdPipe) id: string) {
    return {
      message: 'successful',
      data: await this.answersService.isCorrectAnswer(id),
    };
  }
}
