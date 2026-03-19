import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { ProvidersModule } from './modules/providers/providers.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [PrismaModule, ProvidersModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
