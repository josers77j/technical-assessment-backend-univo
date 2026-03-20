import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { ProductRepository } from './repositories/product.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository],
  imports: [PrismaModule],
})
export class ProductsModule {}
