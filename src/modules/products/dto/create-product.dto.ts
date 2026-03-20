import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'Laptop Dell XPS 15',
    description: 'Product name.',
    minLength: 3,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name!: string;

  @ApiProperty({
    example: '1299.99',
    description: 'Product price as decimal string.',
  })
  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '1,2' })
  price!: string;

  @ApiPropertyOptional({
    example: 'High-performance laptop for developers.',
    description: 'Product description.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'XPS15-2026',
    description: 'Stock keeping unit.',
  })
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiPropertyOptional({
    example: 'Computers',
    description: 'Product category.',
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({
    example: 50,
    description: 'Available stock quantity.',
  })
  @IsOptional()
  @IsInt()
  stockQuantity?: number;

  @ApiPropertyOptional({
    example: '35x24x1.8 cm',
    description: 'Product dimensions.',
  })
  @IsOptional()
  @IsString()
  dimensions?: string;

  @ApiProperty({
    example: 1,
    description: 'Identifier of the provider that owns this product.',
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  providerId!: number;
}
