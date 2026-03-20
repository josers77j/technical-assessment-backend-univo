import {
  IsString,
  IsDecimal,
  IsOptional,
  IsInt,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;

  @IsOptional()
  @IsDecimal({ decimal_digits: '1,2' })
  price?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsInt()
  stockQuantity?: number;

  @IsOptional()
  @IsString()
  dimensions?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  providerId?: number;
}
