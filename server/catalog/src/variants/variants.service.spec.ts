import { Test, TestingModule } from '@nestjs/testing';
import { VariantService } from './variants.service';

describe('VariantsService', () => {
  let service: VariantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VariantService],
    }).compile();

    service = module.get<VariantService>(VariantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
