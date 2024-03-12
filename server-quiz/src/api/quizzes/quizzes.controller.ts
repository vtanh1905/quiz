import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { QuizzesService } from './quizzes.service';
import { ObjectIdPipe } from 'src/common/pipes';

@ApiTags('quizzes')
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Get(':id')
  async getQuestionsById(@Param('id', ObjectIdPipe) id: string) {
    return {
      message: 'successful',
      data: await this.quizzesService.getQuestionsById(id),
    };
  }
}
