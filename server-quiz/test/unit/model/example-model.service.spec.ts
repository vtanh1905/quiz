import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { ExampleRepository } from '../../../src/model/example/example.repository';
import { Example } from '../../../src/model/example/example.schema';

describe('ExampleService', () => {
  let service: ExampleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [ExampleRepository, { provide: getModelToken(Example.name), useValue: jest.fn() }],
    }).compile();

    service = module.get<ExampleRepository>(ExampleRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
