import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { ExampleDto } from './dto/example.dto';
import { ExampleService } from './example.service';

@ApiTags('example')
@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get()
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  async getAll(@Query('limit') limit = 10, @Query('page') page = 1) {
    return {
      message: 'Get Examples Successfully',
      data: await this.exampleService.get(limit, page),
    };
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return {
      message: 'Get Example Successfully',
      data: await this.exampleService.getOne(id),
    };
  }

  @Post()
  async create(@Body() exampleDto: ExampleDto) {
    const { name, age, address } = exampleDto;
    await this.exampleService.create({ name, age, address });
    return {
      message: 'Create Example Successfully',
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() exampleDto: ExampleDto) {
    const { name, age, address } = exampleDto;
    await this.exampleService.update(id, { name, age, address });
    return {
      message: 'Update Example Successfully',
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.exampleService.delete(id);
    return {
      message: 'Delete Example Successfully',
    };
  }
}
