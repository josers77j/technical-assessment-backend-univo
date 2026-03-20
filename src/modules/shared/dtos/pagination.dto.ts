import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

interface Fields {
  [key: string]: boolean;
}
type sortType = 'asc' | 'desc';
interface Sort {
  [key: string]: sortType;
}
export class PaginationDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  page?: number = 1;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  limit?: number = 10;

  @IsOptional()
  @IsString()
  filter?: string;

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

  @IsOptional()
  @IsObject()
  @Transform(({ value }: TransformFnParams): Sort | null => {
    const raw: unknown = value;
    if (raw && typeof raw === 'string') {
      const isDescending = raw.startsWith('-');
      const field = isDescending ? raw.slice(1) : raw;
      return { [field]: isDescending ? 'desc' : 'asc' };
    }

    return null;
  })
  sort?: Sort;
}
