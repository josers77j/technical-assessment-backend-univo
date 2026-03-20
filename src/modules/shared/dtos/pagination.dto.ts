import { Transform, TransformFnParams, Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

interface Fields {
  [key: string]: boolean;
}
type sortType = 'asc' | 'desc';
interface Sort {
  [key: string]: sortType;
}
export class PaginationDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'Page number (starts at 1).',
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({
    example: 10,
    description: 'Number of items returned per page.',
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  limit?: number = 10;

  @ApiPropertyOptional({
    example: 'laptop',
    description: 'Generic text filter used by each resource.',
  })
  @IsOptional()
  @IsString()
  filter?: string;

  @ApiPropertyOptional({
    example: 'id,name,price',
    description: 'Comma-separated list of fields to include in the response.',
  })
  @IsOptional()
  @IsObject()
  @Transform(({ value }: TransformFnParams): Fields | null => {
    const raw: unknown = value;

    if (typeof raw === 'string') {
      const data = raw
        .split(',')
        .map((field) => field.trim())
        .filter((field) => field.length > 0);

      const dataConverted = data.reduce<Fields>((acc, field) => {
        if (!acc[field]) acc[field] = true;
        return acc;
      }, {});

      return dataConverted;
    }

    return null;
  })
  fields?: Fields;

  @ApiPropertyOptional({
    example: 'name,-price',
    description:
      'Comma-separated sorting fields, prefix with - for desc order.',
  })
  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  @Transform(({ value }: TransformFnParams): Sort[] | null => {
    const raw: unknown = value;

    if (typeof raw === 'string') {
      const data = raw
        .split(',')
        .map((field) => field.trim())
        .filter((field) => field.length > 0);
      const dataConverted = data.reduce<Sort[]>((acc, sort) => {
        const isDescending = sort.startsWith('-');
        const field = isDescending ? sort.slice(1) : sort;

        acc.push({ [field]: isDescending ? 'desc' : 'asc' });

        return acc;
      }, []);

      return dataConverted;
    }

    return null;
  })
  sort?: Sort[];
}
