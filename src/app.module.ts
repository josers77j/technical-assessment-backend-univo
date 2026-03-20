import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { ProvidersModule } from './modules/providers/providers.module';

@Module({
  imports: [PrismaModule, ProvidersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
