import { Product } from '@prisma/client';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';

export interface ProductRaw {
  products: Partial<Product[]>;
  totalItems: number;
  pagination: PaginationDto;
}
