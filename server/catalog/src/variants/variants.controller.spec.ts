import { Test, TestingModule } from '@nestjs/testing';
import { VariantController } from './variants.controller';
import { VariantService } from './variants.service';

describe('VariantsController', () => {
  let controller: VariantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VariantController],
      providers: [VariantService],
    }).compile();

    controller = module.get<VariantController>(VariantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
