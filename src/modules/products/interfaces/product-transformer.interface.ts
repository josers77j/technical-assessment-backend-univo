import { Product } from '@prisma/client';

export interface ProductTransformer {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsArray: Partial<Product[]>;
}
