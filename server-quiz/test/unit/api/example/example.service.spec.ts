import { Test, TestingModule } from '@nestjs/testing';

import { ExampleService } from '../../../../src/api/example/example.service';
import { ExampleRepository } from '../../../../src/model/example/example.repository';

describe('ExampleService', () => {
  let service: ExampleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExampleService, { provide: ExampleRepository, useValue: jest.fn() }],
    }).compile();

    service = module.get<ExampleService>(ExampleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
