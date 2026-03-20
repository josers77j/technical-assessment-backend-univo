import { Module } from '@nestjs/common';

import { ProvidersController } from './controllers/providers.controller';
import { ProvidersService } from './services/providers.service';
import { ProviderRepository } from './repository/provider.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ProvidersController],
  providers: [ProvidersService, ProviderRepository],
  imports: [PrismaModule],
})
export class ProvidersModule {}
