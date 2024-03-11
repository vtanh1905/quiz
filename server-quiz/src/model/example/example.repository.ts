import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Example } from '..';
import { BaseRepository } from '../base/base.repository';

@Injectable()
export class ExampleRepository extends BaseRepository<Example> {
  constructor(@InjectModel(Example.name) private readonly exampleModel: Model<Example>) {
    super(exampleModel);
  }
}
