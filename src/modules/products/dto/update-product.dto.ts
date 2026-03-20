import {
  IsString,
  IsDecimal,
  IsOptional,
  IsInt,
  Min,
  MinLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { Transform, TransformFnParams } from 'class-transformer';

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'Laptop Dell XPS 15' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;

  @ApiPropertyOptional({
    example: '1399.99',
    description: 'Updated product price as decimal string.',
  })
  @IsOptional()
  @IsDecimal({ decimal_digits: '1,2' })
  price?: string;

  @ApiPropertyOptional({
    example: 'Updated description.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'XPS15-2026' })
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiPropertyOptional({ example: 'Computers' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: 40 })
  @IsOptional()
  @IsInt()
  stockQuantity?: number;

  @ApiPropertyOptional({ example: '35x24x1.8 cm' })
  @IsOptional()
  @IsString()
  dimensions?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Updated provider id relation.',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }: TransformFnParams) => {
    if (!value) return undefined;

    return +value;
  })
  providerId?: number;
}
