import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../../shared/dtos/pagination.dto';

export class ProductFilterDto extends PartialType(PaginationDto) {
  @ApiPropertyOptional({
    example: '100.00',
    description: 'Minimum price to filter products.',
  })
  @IsOptional()
  @IsString()
  priceMin?: string;

  @ApiPropertyOptional({
    example: '2000.00',
    description: 'Maximum price to filter products.',
  })
  @IsOptional()
  @IsString()
  priceMax?: string;
}
