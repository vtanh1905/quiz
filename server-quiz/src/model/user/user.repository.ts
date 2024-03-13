import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import * as bcrypt from 'bcrypt'

import { User } from './user.schema';
import { BaseRepository } from '../base/base.repository';
import { encryptDataByAES256 } from 'src/common/utils';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel);
  }

  async findOne(condition: FilterQuery<User> = {}): Promise<User> {
    if(condition.mobilePhone) {
      condition.mobilePhone = encryptDataByAES256(condition.mobilePhone);
    }

    return await this.model.findOne(condition).exec();
  }

  async create(model: User): Promise<User> {
    // Encrypt MobilePhone with AES256
    model.mobilePhone = encryptDataByAES256(model.mobilePhone);

    // Hash Password
    model.password = bcrypt.hashSync(model.password, bcrypt.genSaltSync());

    return await new this.model({
      ...model,
      createdAt: new Date(),
    }).save();
  }
}
