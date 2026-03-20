import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name!: string;

  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '1,2' })
  price!: string;

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

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  providerId!: number;
}
