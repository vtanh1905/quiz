import { FilterQuery, Model, ProjectionType, QueryOptions, UpdateQuery } from 'mongoose';

export class BaseRepository<BaseModel> {
  constructor(protected model: Model<BaseModel>) {}

  async find(
    condition: FilterQuery<BaseModel> = {},
    projection?: ProjectionType<BaseModel>,
    options?: QueryOptions<BaseModel>,
  ): Promise<BaseModel[]> {
    return await this.model.find(condition, projection, options).exec();
  }

  async findOne(condition: FilterQuery<BaseModel> = {}): Promise<BaseModel> {
    return await this.model.findOne(condition).exec();
  }

  async create(model: BaseModel): Promise<BaseModel> {
    return await new this.model({
      ...model,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, data: UpdateQuery<BaseModel>): Promise<BaseModel> {
    return await this.model.findByIdAndUpdate(id, data).exec();
  }

  async delete(id: string): Promise<BaseModel> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
