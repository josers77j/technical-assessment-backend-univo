import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBody,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductFilterDto } from '../dto/product-filter.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a product',
    description: 'Creates a new product linked to a provider.',
  })
  @ApiBody({ type: CreateProductDto })
  @ApiOkResponse({ description: 'Product created successfully.' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({
    summary: 'List products',
    description:
      'Returns products with optional pagination, search, sorting, field selection, and price range filters.',
  })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({
    name: 'filter',
    required: false,
    description: 'Case-insensitive text search by product name.',
    example: 'laptop',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    description: 'Comma-separated sort fields. Prefix with - for desc.',
    example: 'name,-price',
  })
  @ApiQuery({
    name: 'fields',
    required: false,
    description: 'Comma-separated response fields.',
    example: 'id,name,price',
  })
  @ApiQuery({
    name: 'priceMin',
    required: false,
    example: '100.00',
    description: 'Minimum price filter.',
  })
  @ApiQuery({
    name: 'priceMax',
    required: false,
    example: '1500.00',
    description: 'Maximum price filter.',
  })
  @ApiOkResponse({ description: 'Products retrieved successfully.' })
  findAll(@Query() productFilterDto: ProductFilterDto) {
    return this.productsService.findAll(productFilterDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get product by id',
    description: 'Returns a single product by its identifier.',
  })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ description: 'Product retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Product not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update product',
    description: 'Updates one or more product fields.',
  })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiBody({ type: UpdateProductDto })
  @ApiOkResponse({ description: 'Product updated successfully.' })
  @ApiNotFoundResponse({ description: 'Product not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @HttpCode(204)
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete product',
    description: 'Deletes a product by id.',
  })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiNoContentResponse({ description: 'Product deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Product not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
