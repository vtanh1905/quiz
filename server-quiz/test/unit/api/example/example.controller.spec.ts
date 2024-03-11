import { Test, TestingModule } from '@nestjs/testing';

import { ExampleController } from '../../../../src/api/example/example.controller';
import { ExampleService } from '../../../../src/api/example/example.service';

describe('ExampleController', () => {
  let controller: ExampleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleController],
      providers: [{ provide: ExampleService, useValue: jest.fn() }],
    }).compile();

    controller = module.get<ExampleController>(ExampleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
