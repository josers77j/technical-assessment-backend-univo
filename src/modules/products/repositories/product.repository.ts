import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';

import { ProductFilter } from '../interfaces/product-filter.interface';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return await this.prismaService.product.create({
      data: createProductDto,
    });
  }

  async findAll(productFilter: ProductFilter) {
    const { pagination, where, ...rest } = productFilter;
    const totalItems = await this.prismaService.product.count({
      where,
    });
    const products = await this.prismaService.product.findMany({
      ...pagination,
      where,
      ...rest,
    });

    const response = {
      totalItems,
      products,
    };

    return response;
  }

  async findOneById(id: number) {
    return await this.prismaService.product.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.prismaService.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.product.delete({ where: { id } });
  }
}
