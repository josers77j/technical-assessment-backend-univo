import { ProductRepository } from './../repositories/product.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductFilterDto } from '../dto/product-filter.dto';
import { ProductFilter } from '../interfaces/product-filter.interface';
import { ProductTransformer } from '../transformers/product.transformer';
import { CreateResponseTransformer } from '../transformers/create-response.transformer';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}
  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepository.create(createProductDto);
    return CreateResponseTransformer(product);
  }

  async findAll(productFilterDto: ProductFilterDto) {
    const { page, limit, sort, fields, filter, priceMax, priceMin } =
      productFilterDto;
    const productFilter: ProductFilter = {};

    productFilter.pagination = { take: limit!, skip: (page! - 1) * limit! };

    if (sort && sort?.length > 0) productFilter.orderBy = sort;

    if (typeof fields === 'object' && Object.keys(fields).length > 0)
      productFilter.select = {
        ...fields,
        provider: true,
      };

    if (!productFilter.select)
      productFilter.include = {
        provider: true,
      };

    if (filter !== undefined && filter)
      productFilter.where = {
        name: {
          contains: filter,
          mode: 'insensitive',
        },
      };

    let price = {};

    if (priceMax && priceMin) {
      price = {
        gte: priceMin,
        lte: priceMax,
      };
    } else if (priceMax || priceMin) {
      price = priceMax ? { lte: priceMax } : { gte: priceMin };
    }

    if (Object.keys(price).length > 0)
      productFilter.where = {
        ...productFilter.where,
        price,
      };

    const product = await this.productRepository.findAll(productFilter);
    return ProductTransformer({ ...product, pagination: { page, limit } });
  }

  async findOneById(id: number) {
    const product = await this.productRepository.findOneById(id);

    if (!product) throw new NotFoundException(`Product with id ${id} not found`);

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOneById(id);

    const product = await this.productRepository.update(id, updateProductDto);

    return CreateResponseTransformer(product);
  }

  async remove(id: number) {
    await this.findOneById(id);
    await this.productRepository.remove(id);
  }
}
