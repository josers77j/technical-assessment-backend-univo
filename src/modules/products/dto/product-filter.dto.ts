import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/modules/shared/dtos/pagination.dto';

export class ProductFilterDto extends PartialType(PaginationDto) {
  @IsOptional()
  @IsString()
  priceMin?: string;

  @IsOptional()
  @IsString()
  priceMax?: string;
}
