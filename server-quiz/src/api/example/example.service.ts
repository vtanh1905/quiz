import { Injectable, NotFoundException } from '@nestjs/common';

import { Example, ExampleRepository } from '../../model';

@Injectable()
export class ExampleService {
  constructor(private readonly ExampleRepository: ExampleRepository) {}

  get(limit?: number, page?: number) {
    return this.ExampleRepository.find(undefined, undefined, { limit, skip: (page - 1) * limit });
  }

  getOne(id: string) {
    return this.ExampleRepository.findOne({ _id: id });
  }

  create(model: Example) {
    return this.ExampleRepository.create(model);
  }

  async update(id: string, model: Example) {
    const instance = await this.ExampleRepository.findOne({ _id: id });
    if (!instance) {
      throw new NotFoundException("Id doesn't exists");
    }

    return await this.ExampleRepository.update(id, model);
  }

  async delete(id: string) {
    const instance = await this.ExampleRepository.findOne({ _id: id });
    if (!instance) {
      throw new NotFoundException("Id doesn't exists");
    }

    return await this.ExampleRepository.delete(id);
  }
}
