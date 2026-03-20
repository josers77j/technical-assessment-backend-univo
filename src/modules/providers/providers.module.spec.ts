import { Test, TestingModule } from '@nestjs/testing';
import { ProvidersModule } from './providers.module';
import { ProvidersService } from './services/providers.service';

describe('ProvidersModule', () => {
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [ProvidersModule],
    }).compile();
  });

  it('should compile ProvidersModule', () => {
    expect(moduleRef).toBeDefined();
  });

  it('should provide ProvidersService', () => {
    const service = moduleRef.get(ProvidersService);
    expect(service).toBeDefined();
  });
});
